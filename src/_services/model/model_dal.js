import axios from 'axios';

export const modelService_del = {
    uploadPic
};

function uploadPic(file) {
    return axios.put('http://www.mocky.io/v2/5af9348d320000f51886afe1', { name: file.name, file: file })
        .then(response => {
            // return Promise.reject(response.statusText);
            console.log(response);
        }).catch(error => {
            console.log(error.response)
        });

}
