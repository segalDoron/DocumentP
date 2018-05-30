import axios from 'axios';

export const homeService_del = {
    getInitParams,
};

function getInitParams() {
    //viewer response http://www.mocky.io/v2/5b0d01513300005400b40154
    //editor response http://www.mocky.io/v2/5b03bcd12f00007900e7a67b
    return axios.get('http://www.mocky.io/v2/5b03bcd12f00007900e7a67b')
        .then(response => {
            // for demonstration delete for production ENV
            response.data = { name: "Doron Segal", project: "LMS", role: "EDITOR" };
            return Promise.resolve(response.data);
        }).catch(error => {
            // for demonstration delete for production ENV
            return Promise.resolve({ name: "Doron Segal", project: "LMS", role: "EDITOR" });

            // Un-comment for production ENV
            //return Promise.reject(error);
        });

}