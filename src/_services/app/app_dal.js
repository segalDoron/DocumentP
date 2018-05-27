import axios from 'axios';

export const appService_del = {
    getInitParams,
};

function getInitParams() {
    // http://www.mocky.io/v2/5b03bcf52f00008f05e7a67d  --> view
    return axios.get('http://www.mocky.io/v2/5b03bcd12f00007900e7a67b')
        .then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });

}

