<template>
  <div id="app">
    <tree v-model="treeData" :allow-drag-n-drop="true">
    </tree>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import Tree from '@/components/tree/tree.vue';
import { treeItem } from './types/tree';

@Component({
  components: {
    Tree
  }
})
export default class App extends Vue {
  private treeData: treeItem[] = [
    {
      name: 'Folder',
      children: [
        {
          name: 'Folder 1',
          children: []
        }
      ]
    },
    {
      name: 'Folder 2',
      children: [
        {
          name: 'Folder --',
          children: []
        }
      ]
    }
  ]
}
</script>