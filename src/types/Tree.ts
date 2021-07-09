export interface TreeItem {
    name: string;
    children?: TreeItem[];
    validator?: (draggedNode: TreeItem, dropLocation: TreeItem) => boolean;
    [otherProperties: string]: unknown;
}

export interface BorderConfig {
    show: boolean;
    type: 'dashed' | 'solid';
    color: string;
    width: number;
}

export const borderDefault: BorderConfig = {
    show: false,
    type: 'dashed',
    color: '#adadad',
    width: 1
}