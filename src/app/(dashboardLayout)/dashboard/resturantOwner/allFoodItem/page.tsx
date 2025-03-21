'use client'
import { useState } from "react";

interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const sampleData: FoodItem[] = [
  { id: "1", name: "Burger", category: "Fast Food", price: 5.99, image: "https://via.placeholder.com/50" },
  { id: "2", name: "Pizza", category: "Italian", price: 8.99, image: "https://via.placeholder.com/50" },
  { id: "3", name: "Pasta", category: "Italian", price: 7.49, image: "https://via.placeholder.com/50" },
];

export default function FoodItemTable() {
  const [foodItems, setFoodItems] = useState(sampleData);

  const handleEdit = (id: string) => {
    console.log("Edit item with ID:", id);
  };

  const handleDelete = (id: string) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
  };

  const handleDetails = (id: string) => {
    console.log("View details of item with ID:", id);
  };

  return (
    <div className="max-w-7xl w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Food Items</h2>
      <table className="mx-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Serial</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, index) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <img src={item.image} alt={item.name} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded" />
              </td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">${item.price.toFixed(2)}</td>
              <td className="border p-2 space-x-1 md:space-x-2">
                <button onClick={() => handleDetails(item.id)} className="bg-blue-500 text-white px-2 py-1 text-xs md:text-sm rounded">Details</button>
                <button onClick={() => handleEdit(item.id)} className="bg-yellow-500 text-white px-2 py-1 text-xs md:text-sm rounded">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 text-xs md:text-sm rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}