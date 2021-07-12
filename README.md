# Vue Quick Tree

A simple, straightforward and mostly unopininoted tree vue component.


### Installation
```
npm i vue-quick-tree
```



In your main.ts file
```
import VueQuickTree from 'vue-quick-tree'
Vue.component('vue-quick-tree', VueQuickTree)
```


### Usage

```
<template>
    <vue-quick-tree v-model="tree">
        <template #node="{ node }">
            <span v-if="node.type === 'folder'">📁 {{ node.name }}</span>
            <span v-else>{{ node.name }}</span>
        </template>
    </vue-quick-tree>
</template>

<script>
export default {
    data() {
        return {
            tree: [
                {
                    name: 'stuff'
                    type: 'folder'
                    children: [],
                    validator: (dropLocation, dragLocation) => {}
                }
            ]
        }
    }
}
</script>

```

### Props

| Name| Type  |Description
|--|--|--|
| indentLevel |number  | indent size of the node
| border | BorderConfig (see below) | indent line style
| allowDragNDrop| boolean | determines if drag n drop will enabled

```typescript
// BorderConfig
{
    show: boolean;
    type: 'dashed' | 'solid';
    color: string;
    width: number;
}
```


The expected structure is a recursive array. Feel free to add any thing property you want to add into the object.

**Note: The children property is required to have the nested structure**
