<template>
    <ul>
        <li v-for="(node, nodeIndex) in nodes" :key="nodeIndex"
            :draggable="true"
            @dragover.stop.prevent
            @dragenter.stop.prevent
            @dragstart.stop="onDragNode(node, $event)"
            @drop.prevent.stop="onDropNode(node, $event)"
            @click="toggleVisiblity"
        >
            <slot name="node" :node="node">
                {{ node.name }}
            </slot>

            <tree
                class="node-child"
                v-if="node.children"
                v-model="node.children" 
                :indent-level="indentLevel" 
                :border="border"
                :allow-drag-n-drop="allowDragNDrop"
                :style="{ ...getIndentLevel, ...nodeBorder }"
            >
                <template v-for="(_, slot) of $slots" v-slot:[slot]="props">
                    <slot :name="slot" v-bind="props"/>
                </template>
            </tree>
        </li>
    </ul>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator';

import { treeItem, borderConfig, borderDefault } from '@/types/tree';
import Inspector from './inspector';

@Component({
    name: 'Tree'
})
export default class Tree extends Vue {
    @Prop({ default: () => [] }) value!: treeItem[];
    @Prop({ default: 10 }) indentLevel!: number;
    @Prop({ default: () => (borderDefault)}) border!: borderConfig;
    @Prop({ default: false }) allowDragNDrop!: boolean;

    get nodes(): treeItem[] {
        return this.value;
    }

    get nodeBorder(): {[cssProperties: string]: string} {
        const border = {
            width: this.border.width || borderDefault.width,
            type: this.border.type || borderDefault.type,
            color: this.border.color || borderDefault.color,
        }

        return {
            borderLeft: `${border.width}px ${border.type} ${border.color}`
        }
    }

    get getIndentLevel(): {[cssProperty: string]: string} {
        const push = `${this.indentLevel}px`

        return {
            paddingLeft: push
        }
    }

    private onDragNode(node: treeItem, event: DragEvent): void {
        if (event.dataTransfer && this.allowDragNDrop) {
            event.dataTransfer.setData('text/plain', JSON.stringify(node));

            Inspector.updateActiveNode({ nodeList: this.nodes, activeChild: node })
        }
    }

    private onDropNode(dropLocation: treeItem, event: DragEvent): void {
        if (event.dataTransfer && this.allowDragNDrop) {
            const droppedNode = JSON.parse(event.dataTransfer.getData('text/plain')) as treeItem;

            if (!dropLocation || !droppedNode) {
                return
            }

            if (Inspector.activeNode.activeChild === dropLocation) {
                return
            }

            if (dropLocation.validator && !dropLocation.validator(droppedNode, dropLocation)) {
                return
            }

            if (dropLocation.children) {
                dropLocation.children.push(droppedNode)
            } else {
                dropLocation.children = [droppedNode];
            }

            this.$emit('input', this.nodes)

            Inspector.deleteActiveNodeChild()
        }
    }

    private toggleVisiblity(event: InputEvent): void {
        const target = event.target as HTMLInputElement;
        if (!target) return;

        const element = target.getElementsByClassName('node-child')[0]
        if (!element) return;
        
        element.classList.toggle('hide');
    }
}
</script>

<style scoped>
ul {
    padding: 0;
    list-style: none;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.hide {
    display: none;
}
</style>