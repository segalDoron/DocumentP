import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

const baseUrl = 'http://localhost:58633';

function login(username, password) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };

    // return fetch('/users/authenticate', requestOptions)
    //     .then(response => {
    //         if (!response.ok) { 
    //             return Promise.reject(response.statusText);
    //         }

    //         return response.json();
    //     })
    // .then(user => {
    //     // login successful if there's a jwt token in the response
    //     if (user && user.token) {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('user', JSON.stringify(user));
    //     }

    //     return user;
    // });
    let user = forNow();
    let item = {};
    return axios.get('https://jsonplaceholder.typicode.com/comments?postId=1')
        .then(response => {
            if (!response) {
                return Promise.reject(response.statusText);
            }
            return response.data

        }).then(item => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        }).catch(error => {
            console.log(error.response)
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users/' + _id, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/register', requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}

function forNow() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let responseJson = {};

    if (users.length) {
        // if login details are valid return user details and fake jwt token
        let user = users[0];
        responseJson = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
        };
    }
    return responseJson;
}