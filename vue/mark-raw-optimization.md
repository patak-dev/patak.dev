---
title: Mark Raw Optimization
author:
  name: Matias Capeletto
date: 2020-11-10
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content:  Mark Raw Optimization
  - - meta
    - property: og:image
      content: https://www.patak.dev/images/mark-raw-optimization.jpg
  - - meta
    - property: og:url
      content: https://www.patak.dev/vue/mark-raw-optimization.html
  - - meta
    - property: og:description
      content: Using markRaw to optimize VueUse's useRefHistory composable
  - - meta
    - name: twitter:card
      content: summary_large_image
---

<BlogCover src="/images/mark-raw-optimization.jpg" />

# Mark Raw Optimization

[Vue 3 reactivity](https://v3.vuejs.org/guide/reactivity.html) just works. The [change detection caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats) that we had to learn in Vue 2 are now gone. If you have a reactive object or array, you can assign or push new properties and everything will fall in place. New proxies will be created making the inserted object reactive. You may feel that there is no need to think that much anymore about what is going on under the hood. But there are cases where making every inserted object reactive is not the right choice. If the new objects are immutable for example, a change will never be triggered but we are paying a price for handling reactivity anyway.

```js{9}
const state = ref({ posts: [], authors: [] })

// Immutable data
const post = { ... }

// Insert the post in a reactive array
state.value.posts.push( post )

// state.value.posts[0] is reactive
```

The reactivity system provides tools to opt out of reactivity in these cases. [With `shallowRef`, and `markRaw`](https://v3.vuejs.org/api/basic-reactivity.html#markraw) we can tell Vue that a particular tree of objects doesn't need to be tracked, avoiding the performance hit. There are also other handy utilities [like `readonly`](https://v3.vuejs.org/api/basic-reactivity.html#readonly), that creates readonly proxies to objects or Refs. In this post, we will look at a real example where `markRaw` was used to optimize a composable in VueUse.

## Manual History

For context, you can read the previous two posts in this series. In [Ignorable Watch](./ignorable-watch.md) and [History and Persistence](./history-and-persistence] we dived into how [VueUse's `useRefHistory`](https://vueuse.org/core/useRefHistory/) is implemented and how it can be combined with other composables.

A new reusable piece, [useManualRefHistory](https://vueuse.org/core/useManualRefHistory/) has also been spawned. `useManualRefHistory` offers the same API as the auto-tracking `useRefHistory`, but only generates snapshots when `commit()` is called. It lets users add undo support to their apps that integrates with their operation abstractions.

```js{8,13}
import { ref } from 'vue' 
import { useManualRefHistory } from '@vueuse/core'

const state = ref({ foo: 1, bar: [] })
const { history, commit, undo } = useManualRefHistory(counter, { clone: true })

// Integrate with your operation abstractions
operations.subscribe(commit)

// Or directly create snapshots manually
state.value.foo += 1
state.value.bar.push({ id: 3 })
commit()
```

`useManualRefHistory` can be used together with `useLocalStorage` in the same way that is described in [History and Persistence](./history-and-persistence]. `useRefHistory` is now [coded](https://github.com/vueuse/vueuse/blob/main/packages/core/useRefHistory/index.ts) in terms of `useManualRefHistory`, together with VueUse's `ignorableWatch` and `pausableFilter` utilities. The logic only deals with auto-tracking at this point.

This is a new composable, instead of a `manual` option in `useRefHistory` so users do not have to pay for features they do not use. The manual version is [half the size](https://vueuse.org/core/useManualRefHistory/) of the auto-tracked composable.

## Raw History

Let's look at a simplified version of `useManualRefHistory` to discuss an important optimization when dealing with reactive state. `useManualUndo` will only keep track of past history and provide an `undo` function to go back to previous states. `clone` is a utility function that could be implemented piping `JSON.parse` and `JSON.stringify`.

```js{5-7,11-14}
import { clone } from 'utils'

function useManualUndo(source) {

  function snapshot() {
    return clone(source.value)
  }

  const history = ref([ snapshot() ])
  
  function commit() {
    history.value.unshift( snapshot() )

    // history.value[n] is reactive
  }

  function undo() {
    history.value.shift()
    source.value = clone(history.value[0])
  }

  return { history, commit, undo }
}  
```

When we add the snapshot to the `history` ref array, what is pushed is a reactive version of it. But once we take a snapshot, it will no longer be mutated. If the `source` holds big objects, we will be paying for a lot of unneeded reactive objects. We could decide to avoid using reactivity altogether for the `history` array but being able to watch for changes to it is an important feature

```html{2}
<template>
  <button :disable="history.length > 1" @click="undo()">
    Undo
  </button>
</template>
```

This is a good use case for `markRaw`. We can use it to indicate to Vue that the object returned by `snapshot()` doesn't need to be reactive. When this marked object is added to the `history` array, it will no be transformed into a reactive object.

```js{2,6-8,12-15}
import { clone } from 'utils'
import { markRaw } from 'vue'

function useManualUndo(source) {

  function snapshot() {
    return markRaw( clone(source.value) )
  }

  const history = ref([ snapshot() ])

  function commit() {
    history.value.unshift( snapshot() )
    // history.value[n] is *not* reactive
  }

  ...
```

If we watch for changes in the `history` array, the effect will be triggered normally when a snapshot is added to it. But the reactivity system will not longer care if there is a change to the snapshot object itself.

When we need to expose these raw objects to other composables independently of other reactive objects, instead of `markRaw` we have `shallowRef` available that creates a ref that tracks its own `.value` mutation but internal changes behave as if the object was marked with `markRaw`.

<br><br>

[Ignorable Watch](./ignorable-watch.md)
<br>*VueUse's ignorableWatch, useRefHistory and watch flush modes*

[History and Persistence](./history-and-persistence.md)
<br>*useRefHistory and useLocalStorage as building blocks to create new composables*

[**Mark Raw Optimization**](./mark-raw-optimization.md)
<br>***Using markRaw to optimize VueUse's useRefHistory composable***
