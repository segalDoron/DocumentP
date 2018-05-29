import { homeService_del, viewService_del } from '../_services'

export const homeAction = {
    getInitParams,
    getUser,
    getComment
};

function getUser() {
    return JSON.parse(sessionStorage.getItem('initData'));
}

function getInitParams() {
    return homeService_del.getInitParams()
        .then(response => {
            sessionStorage.setItem('initData', JSON.stringify(response));
            return response;
        }).catch(error => {
            alert("Enable to get user Data");
            return ({ name: "", project: "", role: "VIEWER" })
        })
}


function getComment(user) {
    return dispatch => {
        viewService_del.getComments(user)
            .then(response => {               
                dispatch(setComments(null, response));
            }).catch(error => {
                alert("Enable to get Comments data");
                dispatch(setComments(null, []));
            })
    }
    function setComments(clickE, comments) { return { type: "SAVE", data: { click: clickE, comm: comments } } }
}