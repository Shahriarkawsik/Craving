"use client"

import { CommonPayload, getAllOrder } from "@/app/action/auth/allApi";
import OrderHistoryTable from "./components/OrderHistoryTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const OrderHistory: React.FC = () => {

  const { data: session } = useSession();
  const [orderData, setOrderData] = useState<CommonPayload[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOrder(session?.user?.email as string);
      setOrderData(data);
    }
    fetchData();
  }, [session]);

  console.log(session?.user?.email);

  // separate based on status
  const pendingOrders = orderData.filter((order) => order.status === "Pending");
  const preparingOrders = orderData.filter(
    (order) => order.status === "Preparing"
  );
  const inTransitOrders = orderData.filter(
    (order) => order.status === "In transit"
  );
  const deliveredOrders = orderData.filter(
    (order) => order.status === "Delivered"
  );
  const cancelledOrders = orderData.filter(
    (order) => order.status === "Cancelled"
  );

  // Count orders by status
  const statusCount = orderData.reduce((acc, order) => {
    if (order.status) {
      acc[order.status] = (acc[order.status] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div className="px-5">
      <section>
        <h1 className="uppercase text-2xl">Orders History</h1>
        <p>{`Hello, Gulam Jakaria. You have ${statusCount["pending"]} pending orders.`}</p>
      </section>

      {/* tabs */}
      <section className="my-5">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">{`Pending ${statusCount["pending"]}`}</TabsTrigger>
            <TabsTrigger value="preparing">{`Preparing ${statusCount["preparing"]}`}</TabsTrigger>
            <TabsTrigger value="in transit">{`In Transit ${statusCount["in transit"]}`}</TabsTrigger>
            <TabsTrigger value="delivered">{`Delivered ${statusCount["delivered"]}`}</TabsTrigger>
            <TabsTrigger value="cancelled">{`Cancelled ${statusCount["cancelled"]}`}</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <OrderHistoryTable orderHistory={orderData}></OrderHistoryTable>
          </TabsContent>
          <TabsContent value="pending">
            <OrderHistoryTable orderHistory={pendingOrders}></OrderHistoryTable>
          </TabsContent>
          <TabsContent value="preparing">
            <OrderHistoryTable
              orderHistory={preparingOrders}
            ></OrderHistoryTable>
          </TabsContent>
          <TabsContent value="in transit">
            <OrderHistoryTable
              orderHistory={inTransitOrders}
            ></OrderHistoryTable>
          </TabsContent>
          <TabsContent value="delivered">
            <OrderHistoryTable
              orderHistory={deliveredOrders}
            ></OrderHistoryTable>
          </TabsContent>
          <TabsContent value="cancelled">
            <OrderHistoryTable
              orderHistory={cancelledOrders}
            ></OrderHistoryTable>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default OrderHistory;
