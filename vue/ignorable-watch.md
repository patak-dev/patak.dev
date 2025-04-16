---
title: Ignorable Watch
author:
  name: Matias Capeletto
date: 2020-12-15
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Ignorable Watch
  - - meta
    - property: og:image
      content: https://www.patak.dev/images/ignorable-watch.jpg
  - - meta
    - property: og:url
      content: https://www.patak.dev/vue/ignorable-watch.html
  - - meta
    - property: og:description
      content: VueUse's ignorableWatch, useRefHistory and watch flush modes
  - - meta
    - name: twitter:card
      content: summary_large_image
---

<BlogCover src="/images/ignorable-watch.jpg" />

# Ignorable watch

[VueUse's `useRefHistory`](https://vueuse.org/core/useRefHistory/) lets you watch a ref and keep track of its history, providing undo and redo functionality. It uses `flush 'pre'` by default to watching the source ref. Its semantics are aligned with the standard `watch`, creating history points that bundle all the changes done to the source value during the same "tick". The use of `flush 'sync'` is discouraged in the [Vue docs](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#effect-flush-timing). Being able to buffers invalidated effects is important for performance, but also to avoid breaking invariants when generating spurious history points in updates that require several operations. One big caveat for example is that when deeply sync watching an array, a single splice call generates up to three triggers.

Let's look at a simplified `useUndo` composable that only allows undoing of ref changes to understand how we were able to do it and how `ignorableWatch` was distilled so we can use the same technique when building other composables. The main difficulty to implement ref history is how to update the source when undoing without triggering the internal watch and re-adding this state to the history. If we only need to support sync flushing, it can be implemented in a straight forward way using a guard.

```js{3,17,21,24,26}
function useSyncUndo(source, options) {
  const history = ref([source.value])
  const undoing = ref(false)
  
  const _commit = () => {                    
    history.value.unshift(source.value)      
  }                                       
  const _undo = () => {
    if (history.value.length > 1) {          
      history.value.shift()                  
      source.value = history.value[0]
    }
  }
  const stop = watch(                        
    source,
    () => {
      if (!undoing.value) {
        _commit()
      }
    },            
    { ...options, flush: 'sync' }
  )
  function undo() {
    undoing.value = true
    _undo()
    undoing.value = false
  }
  return { undo, history, stop }
}
```

This technique doesn't work with flush pre and post because the sync change to the source in the current "tick" triggers the watch but it is flushed together with other effects after the tick is over. So we need a way to flag certain updates to the source and ignore them after the watch is called. We can achieve this using a double watch. 

```js{2,3,7,9,13,14,16,17,19,26,28-30,33,34}
function ignorableWatch(source,cb,options) {
  const ignoreCount = ref(0)
  const syncCount = ref(0)
  const syncStop = watch(
    source,
    () => {
      syncCount.value++
    },
    { ...options, flush: 'sync' },
  )
  const stop = watch( source,
    (...args) => {
      const ignore = ignoreCount.value > 0 && 
        ignoreCount.value === syncCount.value

      ignoreCount.value = 0
      syncCount.value = 0

      if (!ignore) {
        cb(...args)
      }
    }, 
    options 
  )
  const ignoreUpdates = (updater) => {
    const prev = syncCount.value
    updater()
    const changes = syncCount.value - prev
    // Add sync changes done in updater
    ignoreCount.value += changes
  }
  const ignorePrevAsyncUpdates = () => {
    // All sync changes til are ignored
    ignoreCount.value = syncCount.value
  }
  return { 
    ignoreUpdates,
    ignorePreAsyncUpdates,
    stop: () => {
      syncStop()
      stop()
    }
  }
}
```
The syncCount is incremented in sync with every change to the source ref value using a watch with `flush 'sync'`. This lets us know how many times the ref has been modified in this "tick". When calling `ignoreUpdates`, all sync changes to the source in the updater function will be counted and added to the `ignoreCount`. When the second watch flushes at the end of the tick, we know if there were more changes done to the source than the ones that were ignored so we can filter out the triggered effect if all the changes in the "tick" were marked to be ignored.

[VueUse's `ignorableWatch`](https://vueuse.org/shared/watchignorable/) follows this idea supporting all flush modes. It is [implemented](https://github.com/vueuse/vueuse/blob/main/packages/shared/watchIgnorable/index.ts) using the double watch scheme for flush `'pre'` and `'post'`, a sync watch allows us to count changes and ignore the triggered effect if all operations were flagged to be ignored in the current "tick". For `'sync'`, a single watch with a guard is used to implement `ignoreUpdates` and `ignorePrevAsyncUpdates` is a no-op provided so users can write generic code that does not depend on the `flush` mode.

There is a related utility in VueUse called [pausableWatch](https://vueuse.org/shared/watchPausable/) that exposes two methods `pause()` and `resume()` allowing to ignore the watch while it is paused. `ignorableWatch` is different from it because in `pausableWatch` effects are ignored if the watch is paused at flush time.

```js{2,5,8-10,12-13}
const source = ref(0)
const { pause, resume } = pausableWatch(
  source, 
  () => {
    console.log(source.value)
  }
)
pause()
source.value = 1 // paused while changed
resume()
await nextTick() 
// but it is not paused at flush time, 
// so it still logs 1
```

When we use `ignorableWatch`, the effects are ignored when they are triggered.

```js{2,5,8-10,12}
const source = ref(0)
const { ignoreUpdates } = ignorableWatch(
  source, 
  () => {
    console.log(source.value)
  }
)
ignoreUpdates( () => {
  source.value = 1
})
await nextTick() 
// nothing... the watch ignored the change
```

Now that we have `ignorableWatch` in our tool belt, we can build a generic version of the `useUndo` composable that supports all flushing modes. We leave `_commit` and `_undo` untouched so we can focus on how to modify the watched source without triggering when undoing.

```js{17,20-21}
function useUndo(source, options) {
  const history = ref([source.value])
  
  const _commit = () => {
    history.value.unshift(source.value)
  }
  const _undo = () => {
    if (history.value.length > 1) {
      history.value.shift()
      source.value = history.value[0]
    }
  }
  const {
    ignoreUpdates,
    ignorePrevAsyncUpdates,
    stop
  } = ignorableWatch(source,_commit,options)

  const undo = () => {
    ignorePrevAsyncUpdates()
    ignoreUpdates(_undo)
  }
  return { undo, history, stop }
}
```

You can check the [implementation of `useRefHistory`](https://github.com/vueuse/vueuse/blob/main/packages/core/useRefHistory/index.ts) to see how `ignorableWatch` is used in the lib. In it, other useful features to deal with ref history are provided.

I learned about the importance of `flush 'pre'` while developing undo support for [Layoutit Grid](https://github.com/Leniolabs/layoutit-grid). I was later able to upstream some of this experience to [VueUse](https://github.com/antfu/vueuse), and `ignorableWatch` was spawned organically as part of this process. This is a good example of how working in Apps using [Vue Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) facilitates the discovery and sharing of reusable pieces.

<br><br>

[**Ignorable Watch**](./ignorable-watch.md)
<br>***VueUse's ignorableWatch, useRefHistory and watch flush modes***

[History and Persistence](./history-and-persistence.md)
<br>*useRefHistory and useLocalStorage as building blocks to create new composables*

[Mark Raw Optimization](./mark-raw-optimization.md)
<br>Using markRaw to optimize VueUse's useRefHistory composable