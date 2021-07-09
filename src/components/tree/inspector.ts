import { treeItem } from '@/types/tree';

type ActiveNode = {
    nodeList?: treeItem[];
    activeChild?: treeItem
}

class Inspector {
    public activeNode: ActiveNode = {};

    public deleteActiveNodeChild() {
        const { nodeList, activeChild } = this.activeNode;
        
        if (nodeList && activeChild) {
            const childIndex = nodeList.findIndex(child => {
                return JSON.stringify(child) == JSON.stringify(activeChild)
            })

            if (childIndex !== -1) {
                nodeList.splice(childIndex, 1)
            }

            this.activeNode = {};
        }
    }

    public updateActiveNode(activeNode: ActiveNode) {
        this.activeNode = activeNode;
    } 
}

export default new Inspector()