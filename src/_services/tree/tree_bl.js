import { treeConstants } from '../../_constants';
import treeNode from '../../_helpers/treeNode'


export const treeService_bl = {
    setTree,
};
function setTree(editorHtml, hasHeaders, hasComments) {
    const loggedUser = JSON.parse(sessionStorage.getItem('initData'));
    let counter = { counter: 0 };
    let newChild = new treeNode();
    let lastHeaderOrder = -1;
    let currentNodeRef;
    let treeData = [];
    let commentsData = [];
    let lastComment = { length: null, position: null };

    if (hasHeaders.length > 0 || hasComments.length > 0) {

        for (let index = 0; index < editorHtml.length; index++) {
            const element = editorHtml[index]

            // enter if element is a header tag and construct header object
            if (element.nodeName == treeConstants.NODE_NAME.H1 ||
                element.nodeName == treeConstants.NODE_NAME.H2 ||
                element.nodeName == treeConstants.NODE_NAME.H3 ||
                element.nodeName == treeConstants.NODE_NAME.H4) {

                let headerOrder = parseInt(element.localName[1]);


                // if header is h1 push data and create a new parent obj
                if (headerOrder == 1) {
                    if (newChild.containsData) treeData.push(newChild);
                    newChild = new treeNode();
                    newChild.name = element.innerText.trim();
                    newChild.position = counter.counter;
                    newChild.order = 1;
                    currentNodeRef = newChild;
                }
                else orderHeaders(newChild, currentNodeRef, headerOrder, element.innerText, counter);
                counter.counter += 1 + element.innerText.length;
                newChild.containsData = true;
                lastHeaderOrder = headerOrder;
                continue;
            }

            //else continue counting 
            else {
                // element is a comment
                if (element.children.length > 0 && element.children[0].hasAttribute('id'))
                    // one in a paragraph
                    if (element.children.length == 1)
                        addToCommentToArray(element, counter, lastComment, commentsData, loggedUser)
                    // more then one in the same paragraph
                    else
                        addParagraphChildrenComments(element, counter, commentsData, loggedUser)

                // is element is empty br tag
                else
                    if (element.children[0] && element.children[0].nodeName == treeConstants.NODE_NAME.BR)
                        counter.counter += 1;
                    else {
                        // check if element is an ol tag
                        let addition = element.nodeName == treeConstants.NODE_NAME.OL || element.nodeName == treeConstants.NODE_NAME.UL ? 0 : 1;
                        counter.counter += element.innerText.length + addition;
                    };
            }
        }
        treeData.push(newChild);
    }
    return Promise.resolve({ tree: treeData, comments: commentsData });
}

// insert header in the correct child order
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
            currentNodeRef.children.push(new treeNode(title.trim(), false, counter.counter, x, []))
            break;
        }
    }
}

function addToCommentToArray(element, counter, lastComment, commentsData, loggedUser) {
    // check if it is a new comment tag if it is spatted by a new line it is a new comment
    if (counter.counter - lastComment.length != lastComment.position)
        commentsData.push({ name: loggedUser.name, project: loggedUser.project, text: element.innerText, position: counter.counter })
    lastComment.position = counter.counter;
    lastComment.length = element.innerText.length + 1;
    counter.counter += element.innerText.length + 1;
}

function addParagraphChildrenComments(element, counter, commentsData, loggedUser) {
    // find comments location inside the paragraph
    let childrenCommentPosition = getIndicesOf('<em class="custom-em" id="comment">', element.innerHTML)
    childrenCommentPosition.forEach((childPosition, index) => {
        commentsData.push({ name: loggedUser.name, project: loggedUser.project, text: element.children[index].innerHTML, position: childPosition + counter.counter })
    })
    counter.counter += element.innerText.length + 1;
}

function getIndicesOf(searchStr, str) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];

    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}
