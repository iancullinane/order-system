
// async function
export async function putOrder(data) {
    // await response of fetch call
    console.log(data);
    let request = await fetch('http://localhost:5003/api/v1/orders', {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(data),
    });
    // only proceed once second promise is resolved
    return data;
}

export async function getOrders() {
    // await response of fetch call
    let response = await fetch('http://localhost:5003/api/v1/orders');
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
}
