// import { getData } from "@/app/action/auth/allApi";


interface Props {
  email: string;
}

const FoodList = async ({ email }: Props) => {
//   const foodItems = await getData(email);
    console.log(email)
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Food Items</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Availability</th>
            </tr>
          </thead>
          <tbody>
            {/* {foodItems.length > 0 ? (
              foodItems.map((food) => (
                <tr key={food.id} className="text-center border-b">
                  <td className="py-2 px-4 border">
                    <img src={food.image} alt={food.foodName} className="w-12 h-12 rounded" />
                  </td>
                  <td className="py-2 px-4 border">{food.foodName}</td>
                  <td className="py-2 px-4 border">{food.category}</td>
                  <td className="py-2 px-4 border">${food.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border">
                    {food.is_available ? (
                      <span className="text-green-500">Available</span>
                    ) : (
                      <span className="text-red-500">Not Available</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  No food items found.
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodList;
