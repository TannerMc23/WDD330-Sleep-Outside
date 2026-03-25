// 1. We obtain the server URL from the .env file
const baseURL = import.meta.env.VITE_SERVER_URL;

// Utility function to convert the response to JSON and handle errors
async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ProductData {
  constructor() {
    // We no longer need 'category' here because we will pass it in getData()
  }

  // 2. We modify getData to be asynchronous and receive the category
  async getData(category) {
    // We make the fetch to the API using the URL from the .env file
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    // IMPORTANT: The Render API returns the products inside the .Result property
    return data.Result;
  }

  // 3. We modify to search for a specific product by ID
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}