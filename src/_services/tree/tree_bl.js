export const treeService_bl = {
    setTree
};
function setTree(editorHtml) {
    const data = [];
    let lastHeader = '';
    let newChild = {};
    for (let index = 0; index < editorHtml.length; index++) {
        const element = editorHtml[index]
        if (element.localName == "h1" || element.localName == "h2" || element.localName == "h3" || element.localName == "h4") {
            // if(Object.keys(newChild).length === 0 && newChild.constructor === Object)

            let headerOrder = element.localName[1];
            if (headerOrder == 1) {
                newChild = {
                    name: element.innerText.trim(),
                    toggled: true,
                    children: []
                }
                data.push(newChild);
            }
            if (headerOrder == 2) {
                newChild.children.push({
                    name: element.innerText.trim(),
                    toggled: false,
                    children: [],
                    parent: newChild
                });
            };
        }
        else continue;
    }
    return Promise.resolve(data);
}