import axios from 'axios';

export const treeService_dal = {
    saveTree,
    getTree
};

function saveTree(tree, user) {
    return axios.put('http://www.mocky.io/v2/5af05717310000590096c5d2/' + user.project, { tree: tree })
        .then(response => {
            return Promise.resolve(response);
        }).catch(error => {

            // for demonstration delete for production ENV
            return Promise.resolve('response');

            // Un-comment for production ENV
            //return Promise.reject(error);
        });
}

function getTree(user) {
    return axios.get('http://www.mocky.io/v2/5af05717310000590096c5d2' + user.project)
        .then(response => {
            // for demonstration delete for production ENV
            response = [
                {
                    name: 'h1-0',
                    order: 1,
                    toggled: true,
                    children: [
                        {
                            name: 'h2-0-0',
                            order: 2,
                            children: [
                                { name: 'h3-0-0-0', order: 3, children: [{ name: 'h4-0-0-0-0', order: 4, }] },
                                { name: 'h3-0-0-1', order: 3, children: [{ name: 'h4-0-0-0-1', order: 4, }] }
                            ]
                        },
                        {
                            name: 'h2-0-1',
                            loading: true,
                            order: 2,
                            children: []
                        },
                        {
                            name: 'h2-0-2',
                            order: 2,
                            children: [
                                { name: 'h3-0-2-0', order: 3, children: [{ name: 'h4-0-2-0-0', order: 4, }] }
                            ]
                        }
                    ]
                },
                {
                    name: 'h1-1',
                    toggled: true,
                    order: 1,
                    children: [
                        {
                            name: 'h2-1-0',
                            order: 2,
                            children: [
                                { name: 'h3-1-0-0', order: 3, children: [{ name: 'h4-1-0-0-0', order: 4, }] },
                                { name: 'h3-1-0-1', order: 3, children: [{ name: 'h4-1-0-0-1', order: 4 }] }
                            ]
                        },
                        {
                            name: 'h2-1-1',
                            order: 2,
                            loading: true,
                            children: []
                        },
                        {
                            name: 'h2-1-2',
                            order: 2,
                            children: [
                                { name: 'h3-1-2-0', order: 3, children: [{ name: 'h4-1-2-0-0', order: 4 }, { name: 'h4-1-2-0-1', order: 4 }] }
                            ]
                        }
                    ]
                }
            ]
            return Promise.resolve(response);
        }).catch(error => {

            // for demonstration delete for production ENV
            let response = [
                {
                    name: 'h1-0',
                    order: 1,
                    toggled: true,
                    children: [
                        {
                            name: 'h2-0-0',
                            order: 2,
                            children: [
                                { name: 'h3-0-0-0', order: 3, children: [{ name: 'h4-0-0-0-0', order: 4, }] },
                                { name: 'h3-0-0-1', order: 3, children: [{ name: 'h4-0-0-0-1', order: 4, }] }
                            ]
                        },
                        {
                            name: 'h2-0-1',
                            loading: true,
                            order: 2,
                            children: []
                        },
                        {
                            name: 'h2-0-2',
                            order: 2,
                            children: [
                                { name: 'h3-0-2-0', order: 3, children: [{ name: 'h4-0-2-0-0', order: 4, }] }
                            ]
                        }
                    ]
                },
                {
                    name: 'h1-1',
                    toggled: true,
                    order: 1,
                    children: [
                        {
                            name: 'h2-1-0',
                            order: 2,
                            children: [
                                { name: 'h3-1-0-0', order: 3, children: [{ name: 'h4-1-0-0-0', order: 4, }] },
                                { name: 'h3-1-0-1', order: 3, children: [{ name: 'h4-1-0-0-1', order: 4 }] }
                            ]
                        },
                        {
                            name: 'h2-1-1',
                            order: 2,
                            loading: true,
                            children: []
                        },
                        {
                            name: 'h2-1-2',
                            order: 2,
                            children: [
                                { name: 'h3-1-2-0', order: 3, children: [{ name: 'h4-1-2-0-0', order: 4 }, { name: 'h4-1-2-0-1', order: 4 }] }
                            ]
                        }
                    ]
                }
            ]
            return Promise.resolve(response);

            // Un-comment for production ENV
            //return Promise.reject(error);
        });
}