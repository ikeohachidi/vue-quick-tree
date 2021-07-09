# Vue Quick Tree

A simple, straightforward and mostly unopininoted tree vue component.


### Installation
```
npm i vue-quick-tree
```



In your main.ts file
```
import VueQuickTree from 'vue-quick-tree'
Vue.use(VueQuickTree)
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

The expected structure is a recursive array. Feel free to add any thing property you want to add into the object.

**Note: The children property is required to have the nested structure**
