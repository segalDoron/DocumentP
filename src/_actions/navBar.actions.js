import { navBarConstants, loaderConstants } from '../_constants';
import { treeService_bl, treeService_dal, viewService_del } from '../_services';
import $ from 'jquery';

export const navBarActions = {
    changeViewState,
    getUser,
    save,
    print
};

function getUser() {
    return JSON.parse(sessionStorage.getItem('initData'));
}

function changeViewState(state) {
    return dispatch => { dispatch(changeView(state)); };

    function changeView(sate) { return { type: navBarConstants.VIEW, state } }
}

function save(clickE, user) {
    return dispatch => {
        $(".ql-editor img").remove()
        const inner = $(".ql-editor").children();
        const hasHeaders = $(".ql-editor").find('h1,h2,h3,h4');
        const hasComments = $(".ql-editor").find('#comment');
        treeService_bl.setTree(inner, hasHeaders, hasComments, user).then(
            response => {
                treeService_dal.saveTree(response.tree, user)
                    .then(() => {
                        dispatch(setNewTree(response.tree));
                    }).then(() => {
                        viewService_del.saveComments(response.tree, user)
                            .then(() => {
                                dispatch(saveView(clickE, response.comments));
                                dispatch(showLoader(false));
                            }).catch((error) => {
                                alertError(error);
                                dispatch(showLoader(false));
                            })
                    }).catch((error) => {
                        alertError(error);
                        dispatch(showLoader(false));
                    })

            },
            error => {
                alertError(error);
                dispatch(showLoader(false));
            }
        );
        function showLoader(show) { return { type: loaderConstants.SHOW_LOADER, show } }
        function setNewTree(newTree) { return { type: navBarConstants.NEW_TREE, newTree } }
        function saveView(clickE, comments) { return { type: navBarConstants.SAVE, data: { click: clickE, comm: comments } } }
    }
}

function alertError(error) {
    console.log(error.message)
    // can invoke different messages for different errors
    alert("Error while trying to save");
}


function print() {
    let style = `
    <style type="text/css">
        @page {
            margin: 25mm 25mm 25mm 25mm;
        }
    </style>`;

    let html = $(".ql-editor").html();

    var printWindow = window.open();
    printWindow.document.open('text/plain');
    printWindow.document.write(style + html);
    setTimeout(() => {
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }, 500);
}

