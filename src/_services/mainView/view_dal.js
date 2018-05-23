import axios from 'axios';

export const viewService_del = {
    getView,
    save
};

function getView(select) {

    return axios.get('https://jsonplaceholder.typicode.com/comments?postId=1')
        .then(response => {
            if (!response) {
                return Promise.reject(response.statusText);
            }
            return response.data

        }).catch(error => {
            console.log(error.response)
        });
}

function save(delta) {
    return axios.put('http://www.mocky.io/v2/5af05717310000590096c5d2', { data: delta })
        .then(response => {
            // return Promise.reject(response.statusText);
            console.log(response);
        }).catch(error => {
            console.log(error.response)
        });
}

