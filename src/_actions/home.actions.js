export const homeAction = {
    getUser
};

function getUser() {
    return JSON.parse(sessionStorage.getItem('initData'));
}