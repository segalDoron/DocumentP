import axios from 'axios';

export const modelService_del = {
    uploadPic
};

function uploadPic(file) {
    let a = file;
    return axios.put('http://www.mocky.io/v2/5b02c4a83000008700cee34d', { name: file.name, date: file })
        .then(response => {
            return Promise.resolve("https://d3cif2hu95s88v.cloudfront.net/live-site-2016/product-image/010/1517641044Flower_1-250x250.jpg");
        }).catch(error => {
            return Promise.reject(error.message);
        });

}
