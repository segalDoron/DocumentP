import { authHeader } from '../_helpers';
import axios from 'axios';

export const mainViewService = {
    getView
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