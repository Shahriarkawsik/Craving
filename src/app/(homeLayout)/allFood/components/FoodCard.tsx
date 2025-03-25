import React from 'react';

// Define the interface for the food prop
interface Food {
    _id: string;
    restaurant_id: string;
    foodName: string;
    description: string;
    price: number;
    category: string;
    image: string;
    is_available: boolean;
    created_at: string;
    owner_email: string;
  }

interface FoodCardProps {
  food: Food;        // Define the type of the food prop
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  console.log(food);  // Log the food object for debugging

  return (
    <div>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 border-2">
        {/* Uncomment and replace image src if you have an image field */}
        {/* <img src={food.image} alt={food.name} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" /> */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{food.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{food.description}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
