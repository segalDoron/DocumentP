import axios from 'axios';

export const modelService_del = {
    uploadPic
};

function uploadPic(file) {
    let a = file;
    return axios.put('http://www.mocky.io/v2/5b02c4a83000008700cee34d', { name: file.name, date: file })
        .then(response => {  
            //fake response 
            response = "/src/public/test.jpg";
            return Promise.resolve(response);
        }).catch(error => {
            //fake response
            return Promise.resolve("/src/public/test.jpg");
            
            //return Promise.reject(error.message);
        });

}
