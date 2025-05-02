import Image from "next/image";
import { CommonPayload, restaurantOrderHistoryStatus } from "@/app/action/auth/allApi";
import { toast } from "react-toastify";
import { ObjectId } from "mongodb";

// interface ItemData {
//   // id: number;
//   // user_id: number;
//   // restaurant_id: number;
//   // rider_id: number;
//   // total_amount: number;
//   // status: "pending" | "preparing" | "in transit" | "delivered" | "cancelled";
//   // payment_status: "paid" | "pending" | "failed";
//   // delivery_address: string;
//   // phone: string;
//   // // phone: number;
//   // created_at: string;
//   foodName: string;
// }

interface OrderHistory {
  orderHistory: CommonPayload[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-200 text-yellow-700",
  preparing: "bg-blue-200 text-blue-700",
  "in transit": "bg-orange-200 text-orange-700",
  delivered: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
};

const OrderHistoryTable: React.FC<OrderHistory> = ({ orderHistory }) => {

  const handleStatus = async (e: React.ChangeEvent<HTMLSelectElement>, _id: string | ObjectId) => {
    // console.log(e.target.value);
    const updateStatus = e.target.value;
    // console.log(updateStatus)
    // console.log(updateData);
    const result = await restaurantOrderHistoryStatus(updateStatus, _id);
    if ((result?.modifiedCount ?? 0) > 0) {
      toast.success(`Food is ${updateStatus}`);
    } 
  };




  return (
    <div className="overflow-auto w-full">
      <table className="table w-full border-collapse border border-gray-300">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-4">Order by</th>
            <th className="p-4">Food Item</th>
            <th className="p-4">Total Price</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {orderHistory.map((order) => (
            <tr key={order._id} className="border-b border-gray-200">
              <td className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-10 w-10">
                    <Image
                      src={order.userImage ?? "User Image"}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="User Image"
                    />
                  </div>
                  <h2 className="p-4 whitespace-nowrap">{order.userName}</h2>
                </div>
              </td>

              <td className="p-4 whitespace-nowrap">{order.orderItems?.map((item, index) => <li className="list-decimal" key={index}>{item.foodName}</li>)}</td>
              <td className="p-4 whitespace-nowrap">{order.totalAmount} BDT</td>

              <td className="p-4">
                {
                  order.status === 'Delivered' || order.status === 'Cancelled' ? (
                    <p className={`${order.status === 'Delivered' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'} rounded-full px-2 py-1 inline-block capitalize w-24`}>
                      {order.status}
                    </p>)
                    :
                    <select
                      disabled={order.status === 'preparing'}
                      onChange={(e) => handleStatus(e, order._id as string | ObjectId)}
                      defaultValue={order.status}
                      className={`px-2 py-1 w-24 rounded-full text-sm font-medium ${statusColors[order?.status ?? "Pending"]}`}
                    >
                      <option value="pending" className="bg-yellow-200 text-yellow-700">
                        Pending
                      </option>
                      <option value="preparing" className="bg-blue-200 text-blue-700">
                        Preparing
                      </option>
                    </select>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
