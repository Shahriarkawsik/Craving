import Image from "next/image";
import imgSrc from "../../../../../../assets/images/whatsappQR.jpg";
import { CommonPayload } from "@/app/action/auth/allApi";

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
  return (
    <div className="overflow-auto w-full">
      <table className="table w-full border-collapse border border-gray-300">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Order by</th>
            <th className="p-4 text-left">Food Item</th>
            <th className="p-4 text-left">Total Price</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {orderHistory.map((order) => (
            <tr key={order.id} className="border-b border-gray-200">
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10">
                    <Image
                      src={imgSrc}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="User Image"
                    />
                  </div>
                  <div>
                    <h1 className="font-medium whitespace-nowrap">{"Gulam Jakaria"}</h1>
                  </div>
                </div>
              </td>

              <td className="p-4 whitespace-nowrap">{order.userName}</td>
              <td className="p-4 whitespace-nowrap">{order.orderItems?.map((item, index) => <li key={index}>{item.foodName}</li>)}</td>
              <td className="p-4 whitespace-nowrap">${order.totalAmount}</td>
              <td className="p-4 whitespace-nowrap">{order.status}</td>

              <td className="p-4">
                {
                  order.status === 'Delivered' || order.status === 'Cancelled' ? (
                    <p className={`${order.status === 'Delivered' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'} rounded-full px-2 py-1 inline-block capitalize w-24`}>
                      {order.status}
                    </p>)
                    :
                    <select
                      defaultValue={order.status}
                      className={`px-2 py-1 w-24 rounded-full text-sm font-medium ${statusColors[order?.status ?? "Pending"]}`}
                    >
                      <option value="pending" className="bg-yellow-200 text-yellow-700">
                        Pending
                      </option>
                      <option value="preparing" className="bg-blue-200 text-blue-700">
                        Preparing
                      </option>
                      <option value="in transit" className="bg-orange-200 text-orange-700">
                        In Transit
                      </option>
                      <option value="delivered" className="bg-green-200 text-green-700">
                        Delivered
                      </option>
                      <option value="cancelled" className="bg-red-200 text-red-700">
                        Cancelled
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
