import axios from "axios"; // Importing Axios library for making HTTP requests

const API_URL = "https://localhost:7089/api/Item"; // Base URL for the backend API

// Interface defining the structure of a todo item
export interface Item {
  title: string;
  description: string;
  status: string;
}

// Function to fetch all todo items from the backend
export async function getItems() {
  const response = await axios.get<Item[]>(API_URL); // Making a GET request to fetch items
  return response.data; // Returning the data from the response (list of items)
}

// Function to fetch a single todo item by its title from the backend
export async function getItem(title: string) {
  const response = await axios.get<Item>(`${API_URL}/${title}`); // Making a GET request with the item's title
  return response.data; // Returning the data from the response (single item)
}

// Function to create a new todo item in the backend
export async function createItem(item: Item) {
  const response = await axios.post<Item>(API_URL, item); // Making a POST request to create a new item
  return response.data; // Returning the data from the response (created item)
}

// Function to update an existing todo item in the backend
export async function updateItem(oldTitle: string, item: Item) {
  await axios.put(`${API_URL}/${oldTitle}`, item); // Making a PUT request to update an item
}

// Function to delete a todo item from the backend
export async function deleteItem(title: string) {
  await axios.delete(`${API_URL}/${title}`); // Making a DELETE request to delete an item
}
