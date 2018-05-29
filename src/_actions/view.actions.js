import { viewService_del } from '../_services';

export const viewActions = {
    getText,
    saveText
};

function getText(user) {
    return viewService_del.getText(user)
        .then(response => {
            return response
        })
        .catch(error => {
            alertError(error);
            return [];
        });
}
function saveText(delta, user) {
    return viewService_del.saveText(delta, user)
        .then(response => {
            return response;
        })
        .catch(error => {
            alertError(error);
            return;
        })
}

function alertError(error) {
    console.log(error.message)
    // can invoke different messages for different errors
    alert("Error while trying to save");
}