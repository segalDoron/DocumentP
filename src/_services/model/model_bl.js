export const modelService_bl = {
    constructModelTreeData
};

function constructModelTreeData(data) {
    var response = [];
    if (data) {
        set(data, response);
    }
    return Promise.resolve(response);
}

function set(data, response) {
    data.forEach(element => {
        if (element.name != "")
            response.push({ name: element.name, order: element.order, position: element.position })
        if (element.children.length > 0) set(element.children, response)
    });
}