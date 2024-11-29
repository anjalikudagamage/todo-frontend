import { useEffect, useState } from "react";
import { getItems, deleteItem, Item } from "../services/itemService"; // Importing functions for fetching and deleting items, and the Item type from the item service
import ItemForm from "./ItemForm";
import logo from "../assets/logo.png";

function ItemList() {
  // Defining a functional component named ItemList

  // State variables to manage items and editing state
  const [items, setItems] = useState<Item[]>([]); // Initializing state variable 'items' to store the list of items
  const [editingItem, setEditingItem] = useState<Item | null>(null); // Initializing state variable 'editingItem' to store the item being edited, or null if not editing

  // UseEffect hook: Fetches items when the component is first displayed on the screen
  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems(); // Fetch items from the server
      setItems(items); // Update state with fetched items
    };
    fetchItems(); // Call fetchData function when the ItemList component is first added to the page
  }, []); // Empty dependency array ensures this code runs only once when the component first appears on the page

  // Function to handle deleting an item
  const handleDelete = async (title: string) => {
    await deleteItem(title); // Delete the item from the server
    setItems(items.filter((item) => item.title !== title)); // Update state to remove the deleted item
  };

  // Function to handle editing an item
  const handleEdit = (item: Item) => {
    setEditingItem(item); // Set the editingItem state to the item being edited
  };

  // Function to handle form submission for adding/editing items
  const handleFormSubmit = (item: Item) => {
    if (editingItem) {
      // If editing an existing item
      // Find the index of the old item
      const index = items.findIndex((i) => i.title === editingItem.title);
      if (index !== -1) {
        // Create a new array with the updated item
        const updatedItems = [...items];
        updatedItems[index] = item;
        setItems(updatedItems); // Update state with the updated items array
      }
    } else {
      // If adding a new item
      setItems([...items, item]); // Add the new item to the items array
    }
    setEditingItem(null); // Reset editingItem state to null after form submission
  };

  // JSX rendering of the component
  return (
    <div>
      <div className="header-container">
        <h1 className="todo-header">TO DO LIST</h1> {/* Header title */}
        <img src={logo} alt="Logo" className="logo" /> {/* Logo image */}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through the items array to render table rows for each item */}
          {items.map((item) => (
            <tr key={item.title}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
              <td className="table-buttons">
                {/* Button to edit the item */}
                <button
                  className="btn btn-warning custom-edit-button"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                {/* Button to delete the item */}
                <button
                  className="btn btn-danger custom-delete-button"
                  onClick={() => handleDelete(item.title)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Displaying the ItemForm and passing data */}
      <ItemForm editingItem={editingItem} onFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default ItemList;
