---
title: History And Persistence
author:
  name: Matias Capeletto
date: 2020-11-30
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: History And Persistence
  - - meta
    - property: og:image
      content: https://www.patak.dev/images/history-and-persistence-cover.jpg
  - - meta
    - property: og:url
      content: https://www.patak.dev/vue/history-and-persistence.html
  - - meta
    - property: og:description
      content: Using VueUse's useRefHistory and useLocalStorage as building blocks to create new composables
  - - meta
    - name: twitter:card
      content: summary_large_image
---

<BlogCover src="/images/history-and-persistence-cover.jpg" />

# History and Persistence

Let's implement state persistence with history support in [Vue 3](https://v3.vuejs.org/). A good example of an app that properly handles this functionality is [excalidraw](https://excalidraw.com/). It keeps its state locally, you can reload the page and your design will not be lost. This app also supports undoing (Cmd+z) and redoing (Cmd+Shift+z). If you play with it you will notice that snapshots are committed at the end of dragging operations. If you move or scale a figure, only one snapshot will be created. All the intermediate states are considered a preview for these operations.

<div></div>

## Pause

One possible option to control what is committed to our app history is doing the commits manually. At the end of every operation, we need to add a `commit()` call that will trigger a new snapshot. Another option is to watch for state changes and automatically push a commit. For this second strategy, we need a way to ignore changes that are done while doing an operation across user events like dragging. This is the scheme we will explore in this article. 

We can implement automatic tracking of a ref history using [VueUse's `useRefHistory`](https://vueuse.org/core/useRefHistory/). By default, `useRefHistory` uses `flush: 'pre'` so it will aggregate all the modifications that are done in the same "tick" and create for them a single snapshot. We reviewed why this is important in a previous post about [Ignorable Watch](./ignorable-watch.md). The default auto-commit behavior can be paused to enter previewing mode and resumed after the operation is finished. If the operation is canceled we can reset the state back to the last snapshot before this operation was started. If the operation was completed successfully, we commit the state to create a new snapshot.

```js{23,31,32,37,38}
const state = ref({ ... })

const { 
  undo, redo, 
  pause, resume,
  reset, commit
} = useRefHistory(state)

// Sync operations

function rotateAround(figure,angle,point) {
  // This operation may imply several
  // sync modifications to the state, 
  // but they will be aggregated into 
  // a single snapshot because we
  // are using the default flush: 'pre'
  // ...
}

// Operations across user events

function onDragStart() {
  pause()
  // Modifications to the state won't 
  // generate snapshots
  // ...
}
function onDragEnd() {
  // Succesful operation, resume history 
  // tracking and commit the state
  resume()
  commit()
}
function onDragCancel() {
  // We can also easily support 
  // cancelling the operation
  resume()
  reset()
}
```

<div></div>

## Resume

You can check [Layoutit Grid](https://github.com/Leniolabs/layoutit-grid) for a [production app](http://grid.layoutit.com/) using `useRefHistory` pause and resume to generate snapshots at the end of operations that spawn across user events. We are using this scheme when dragging the grid lines. And we are also using the same pattern when the user modifies certain input values like area names, using `pause` on focus and `resume` on blur. The user can play with the values, previewing the results that is properly reflected in the whole app but only one snapshot will be generated when the user goes out of the input.

<br>

[![Layoutit Grid History](/images/layoutit-grid-history.gif)](http://grid.layoutit.com/)

<div></div>

## Commit

To implement persistence, we can reach for [VueUse's `useLocalStorage`](https://vueuse.org/core/useLocalStorage/). We can create a new composable that combines `useRefHistory` and `useLocalStorage`, implementing both features for our app state.

```js{28-30,35-37}
import { ref, watch, onMounted } from "vue";
import { 
  useRefHistory, 
  useLocalStorage 
} from "@vueuse/core";

export function useAppState(initial, {
  storageKey = "app-state",
  dump = JSON.stringify,
  parse = JSON.parse,
  ...rest
}) {

  const state = ref(initial);

  const history = useRefHistory(state, {
    dump,
    parse,
    ...rest
  });

  const storage = useLocalStorage(
    storageKey
  );

  onMounted(() => {
    if (storage.value) {
      // restore previous session value
      state.value = parse(storage.value);
      history.clear()
    }
  });

  watch(history.last, () => {
    // save last committed snapshot
    const { snapshot } = history.last.value
    storage.value = snapshot;
  });

  return { state, history, storage };
}
```

In `useRefHistory`, the default for `dump` is a clone operation, and `parse` is a no-op. We change the defaults in `useAppState` so the snapshots are stringified values that we can directly store in local storage.

When the component where this composable is used is mounted, we check if there was a previous session state stored and set the state value. We also clear the history so the user can not undo to the app's default initial value.
Then we watch `history.last`, a ref that tracks the last snapshot, to be able to store each snapshot in local storage when the history changes. This ref will not change if we are previewing changes in the middle of an operation where we have paused tracking, so there is no need for special handling of this case.

```html{6-10}
<script setup>
  import { 
    useAppState 
  } from '../composables/useAppState.js'

  const { state, history } = useAppState({ 
    figures: []
  }, {
    deep: true
  })

  // ...
  </script>
```

In our App.vue component, we can use the composable and decide how to expose the state and the history to other components. Passing them by props or using [provide and inject](https://v3.vuejs.org/guide/composition-api-provide-inject.html) to avoid prop drilling. When we want to track deep changes in object or arrays, we need to pass `{ deep: true }` to `useAppState` so `useRefHistory` will use deep watching internally.

[VueUse](https://github.com/antfu/vueuse) provides building blocks that are meant to be combined when implementing your app logic. By creating new custom composables you can build a personalized toolbox that can be shared across your apps.

<br><br>

[Ignorable Watch](./ignorable-watch.md)
<br>*VueUse's ignorableWatch, useRefHistory and watch flush modes*

[**History and Persistence**](./history-and-persistence.md)
<br>***useRefHistory and useLocalStorage as building blocks to create new composables***

[Mark Raw Optimization](./mark-raw-optimization.md)
<br>Using markRaw to optimize VueUse's useRefHistory composable