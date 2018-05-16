import { treeConstants } from '../../_constants';
import treeNode from '../../_helpers/treeNode'


export const treeService_bl = {
    setTree,
};
function setTree(editorHtml, hasHeaders, hasComments) {
    let lastHeader = '';
    let counter = 0;
    let newChild = new treeNode();
    let firstHeader = true;
    let lastHeaderOrder = -1;
    let currentNodeRef;
    let treeData = [];
    let commentsData = []
    let lastComment = { length: null, position: null }

    if (hasHeaders.length > 0 || hasComments.length > 0) {

        for (let index = 0; index < editorHtml.length; index++) {
            const element = editorHtml[index]
            if (element.nodeName == treeConstants.NODE_NAME.H1 ||
                element.nodeName == treeConstants.NODE_NAME.H2 ||
                element.nodeName == treeConstants.NODE_NAME.H3 ||
                element.nodeName == treeConstants.NODE_NAME.H4) {

                let headerOrder = parseInt(element.localName[1]);


                if (headerOrder == 1) {
                    if (newChild.containsData) treeData.push(newChild);
                    newChild = new treeNode();
                    newChild.name = element.innerText.trim();
                    newChild.position = counter;
                    newChild.order = 1;
                    currentNodeRef = newChild;
                }
                else orderHeaders(newChild, currentNodeRef, headerOrder, element.innerText, counter);
                counter += 1 + element.innerText.length;
                newChild.containsData = true;
                lastHeaderOrder = headerOrder;
                continue;
            }

            else {
                if (element.children[0].hasAttribute('id') && element.children[0].attributes[1].value == "comment") {
                    if (counter - lastComment.length != lastComment.position)
                        commentsData.push({ name: "comment" + commentsData.length , position: counter })
                    lastComment.position = counter;
                    lastComment.length = element.innerText.length + 1;
                    counter += element.innerText.length + 1;

                }
                else if ((element.children[0] && element.children[0].nodeName == treeConstants.NODE_NAME.BR)) counter += 1;
                else {
                    let addition = element.nodeName == treeConstants.NODE_NAME.OL || element.nodeName == treeConstants.NODE_NAME.UL ? 0 : 1;
                    counter += element.innerText.length + addition;
                };
            }
        }
        treeData.push(newChild);
    }
    return Promise.resolve({ tree: treeData, comments: commentsData });
}

function orderHeaders(newChild, currentNodeRef, headerOrder, title, counter) {
    currentNodeRef = newChild;
    for (let x = 2; x <= headerOrder; x++) {
        if (x != headerOrder) {
            if (currentNodeRef.children.length == 0) {
                currentNodeRef.children.push(new treeNode());
                currentNodeRef.children[0].order = x;
            }
            currentNodeRef = currentNodeRef.children[currentNodeRef.children.length - 1];
        }
        else {
            currentNodeRef.children.push(new treeNode(title.trim(), false, counter, x, []))
            break;
        }
    }
}