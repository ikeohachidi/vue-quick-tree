<template>
    <ul>
        <li v-for="(node, nodeIndex) in nodes" :key="nodeIndex"
            :draggable="true"
            @dragover.stop.prevent
            @dragenter.stop.prevent
            @dragstart.stop="onDragNode(node, $event)"
            @drop.prevent.stop="onDropNode(node, $event)"
            @click.stop="toggleVisiblity"
        >
            <slot name="node" :node="node">
                {{ node.name }}
            </slot>

            <vue-quick-tree
                class="node-child hide"
                v-if="node.children"
                v-model="node.children" 
                :indent-level="indentLevel" 
                :border="border"
                :allow-drag-n-drop="allowDragNDrop"
                :style="{ ...getIndentLevel, ...nodeBorder }"
            >
                <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="props">
                    <slot :name="slot" v-bind="props"/>
                </template>
            </vue-quick-tree>
        </li>
    </ul>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator';

import { TreeItem, BorderConfig, borderDefault } from '@/types/Tree';
import Inspector from './Inspect';

@Component({
    name: 'vue-quick-tree'
})
export default class VueQuickTree extends Vue {
    @Prop({ default: () => [] }) value!: TreeItem[];
    @Prop({ default: 10 }) indentLevel!: number;
    @Prop({ default: () => (borderDefault)}) border!: BorderConfig;
    @Prop({ default: null }) validatorFunc!: (dragged: TreeItem, dropped: TreeItem) => boolean;
    @Prop({ default: false }) allowDragNDrop!: boolean;

    get nodes(): TreeItem[] {
        return this.value;
    }

    get nodeBorder(): {[cssProperties: string]: string} {
        if (!this.border.show) return {};

        const border = {
            show: this.border.show || borderDefault.show,
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

    private onDragNode(node: TreeItem, event: DragEvent): void {
        if (event.dataTransfer && this.allowDragNDrop) {
            event.dataTransfer.setData('text/plain', JSON.stringify(node));

            Inspector.updateActiveNode({ nodeList: this.nodes, activeChild: node })
        }
    }

    private onDropNode(dropLocation: TreeItem, event: DragEvent): void {
        if (event.dataTransfer && this.allowDragNDrop) {
            const droppedNode = JSON.parse(event.dataTransfer.getData('text/plain')) as TreeItem;

            if (!dropLocation || !droppedNode) {
                return
            }

            if (Inspector.activeNode.activeChild === dropLocation) {
                return
            }

            if (this.validatorFunc && !this.validatorFunc(droppedNode, dropLocation)) {
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
        const target = event.currentTarget as HTMLInputElement;
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
}

.hide {
    display: none;
}
</style>