
export default class treeNode {
    constructor(name, toggled, position, order, children, containsData) {
        this.name = name == undefined ? "" : name;
        this.toggled = toggled == undefined ? true : toggled;
        this.position = position == undefined ? -1 : position;
        this.order = order == undefined ? 1 : order;
        this.children = children == undefined ? [] : children;
        this.containsData = false;
    }
}

export const treeConstants = {
    TREE_NODE_SELECTED: 'USER_TREE_NODE_SELECTION',
    NEW_TREE: 'NEW_TREE',
    NODE_NAME: {
        H1: 'H1',
        H2: 'H2',
        H3: 'H3',
        H4: 'H4',
        BR: 'BR',
        OL: 'OL',
        UL: 'UL'
    }
};
