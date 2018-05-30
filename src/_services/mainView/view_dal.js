import axios from 'axios';

export const viewService_del = {
    getText,
    saveText,
    saveComments,
    getComments
};

function getText(user) {
    return axios.get('http://www.mocky.io/v2/5af05717310000590096c5d2' + user.project)
        .then(response => {
            // for demonstration delete for production ENV
            response.data = [
                { insert: 'Hello ' },
                { insert: 'World!', attributes: { bold: true } },
                { insert: '\n' }
            ];
            return Promise.resolve(response.data);
        }).catch(error => {

            // for demonstration delete for production ENV
            let response = [
                { insert: 'Hello ' },
                { insert: 'World!', attributes: { bold: true } },
                { insert: '\n' }
            ];
            return Promise.resolve(response);

            // Un-comment for production ENV
            //return Promise.reject(error);
        });
}

function saveText(delta, user) {
    return axios.put('http://www.mocky.io/v2/5af05717310000590096c5d2' + user.project, { data: delta })
        .then(response => {
            return Promise.resolve(response);
        }).catch(error => {

            // for demonstration delete for production ENV
            return Promise.resolve('response');

            // Un-comment for production ENV
            //return Promise.reject(error);
        });
}

function saveComments(commentsData, user) {
    return axios.put('http://www.mocky.io/v2/5af05717310000590096c5d2/' + user.project, { comments: commentsData })
        .then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            // for demonstration delete for production ENV
            return Promise.resolve('response');

            // Un-comment for production ENV
            //return Promise.reject(error);
        });
}

function getComments(user) {
    return axios.get('https://jsonplaceholder.typicode.com/comments?postId=1' + user.project)
        .then(response => {
            // for demonstration delete for production ENV
            response = [
                { name: "Doron Segal", project: "LMS", text: "test Comment 1", position: 0 },
                { name: "Doron Segal", project: "LMS", text: "test Comment 2", position: 19 }
            ]
            return Promise.resolve(response);
        }).catch(error => {

            // for demonstration delete for production ENV
            let response = [
                { name: "Doron Segal", project: "LMS", text: "test Comment 1", position: 0 },
                { name: "Doron Segal", project: "LMS", text: "test Comment 2", position: 19 }
            ]
            return Promise.resolve(response);

            // Un-comment for production ENV
            //return Promise.reject(error);
        });
}

