import axios from 'axios';

export const appService_del = {
    getInitParams,
};

function getInitParams() {
    return axios.get('http://www.mocky.io/v2/5b02bd973000006e00cee312')
        .then(response => {
            sessionStorage.setItem('initData', JSON.stringify(response.data));
        }).catch(error => {
            console.log('Error fatching data')
        });

}

