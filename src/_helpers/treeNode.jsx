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