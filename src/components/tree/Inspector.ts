import { TreeItem } from '@/types/Tree';

type ActiveNode = {
    nodeList?: TreeItem[];
    activeChild?: TreeItem;
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