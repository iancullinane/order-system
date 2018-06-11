
// async function
export async function getProducts() {
    // await response of fetch call
    let response = await fetch('http://localhost:8000/api/v1/products');
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
}