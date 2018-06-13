
// async function
export async function putOrder(data) {
    // await response of fetch call
    console.log(data);
    let request = await fetch('http://localhost:8000/api/v1/orders', {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(data),
    });
    // only proceed once second promise is resolved
    return data;
}