export interface treeItem {
    name: string;
    children?: treeItem[];
    validator?: (draggedNode: treeItem, dropLocation: treeItem) => boolean;
    [otherProperties: string]: any;
}

export interface borderConfig {
    show: boolean;
    type: 'dashed' | 'solid';
    color: string;
    width: number;
}

export const borderDefault: borderConfig = {
    show: false,
    type: 'dashed',
    color: '#adadad',
    width: 1
}