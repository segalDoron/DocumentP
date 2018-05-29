import axios from 'axios';

export const homeService_del = {
    getInitParams,
};

function getInitParams() {
    //viewer response http://www.mocky.io/v2/5b0d01513300005400b40154
    //editor response http://www.mocky.io/v2/5b03bcd12f00007900e7a67b
    return axios.get('http://www.mocky.io/v2/5b0d01513300005400b40154')
        .then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });

}