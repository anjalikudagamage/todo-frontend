import React, { useState, useEffect } from "react";
import { updateItem, createItem, Item } from "../services/itemService"; // Importing functions for updating and creating items, and the Item type from the item service

interface ItemFormProps {
  // Defining props interface for ItemForm component
  editingItem: Item | null; // Prop for the item being edited (if any)
  onFormSubmit: (item: Item) => void; // Function to handle form submission
}

function ItemForm({ editingItem, onFormSubmit }: ItemFormProps) { // Defining the ItemForm component and extracting its properties for use
  // State variables to manage form input values
  const [title, setTitle] = useState(""); // State for item title
  const [description, setDescription] = useState(""); // State for item description
  const [status, setStatus] = useState(""); // State for item status

  // Effect hook to update form fields when editingItem prop changes
  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title); // Set title to editingItem's title
      setDescription(editingItem.description); // Set description to editingItem's description
      setStatus(editingItem.status); // Set status to editingItem's status
    } else {
      setTitle(""); // Reset title
      setDescription(""); // Reset description
      setStatus(""); // Reset status
    }
  }, [editingItem]); // Update when 'editingItem' changes

  // Function to reset form fields
  const resetForm = () => {
    setTitle(""); // Reset title
    setDescription(""); // Reset description
    setStatus(""); // Reset status
  };

  // Function to handle form submission
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); // Prevent default form submission behavior

    // Create an item object with form input values
    const item: Item = {
      title,
      description,
      status,
    };

    try {
      if (editingItem) {
        // If editing an existing item
        await updateItem(editingItem.title, item); // Update the item on the server
      } else {
        // If adding a new item
        const newItem = await createItem(item); // Create the item on the server
        item.title = newItem.title; // Update item title with the newly created item's title
      }
      onFormSubmit(item); // Call onFormSubmit function with the submitted item
      resetForm(); // Reset form after successful submission
    } catch (error) {
      // Handle errors
      console.error("Failed to update or create item", error); // Log error message
    }
  }

  // JSX rendering of the component
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* Form element with handleSubmit function as onSubmit handler */}
      {/* Input fields for title, description, and status */}
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control custom-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control custom-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Status</label>
        <input
          type="text"
          className="form-control custom-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </div>
      {/* Button to submit the form, with text "Update" if editingItem exists, otherwise "Add" */}
      <button type="submit" className="btn custom-btn">
        {editingItem ? "Update" : "Add"} Item
      </button>
    </form>
  );
}

export default ItemForm;
