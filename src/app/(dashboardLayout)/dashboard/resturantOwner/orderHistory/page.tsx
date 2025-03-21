import OrderHistoryTable from "./components/OrderHistoryTable";

// Define the type for each order
interface Order {
    id: number;
    user_id: number;
    restaurant_id: number;
    rider_id: number;
    total_amount: number;
    status: "pending" | "preparing" | "in transit" | "delivered" | "cancelled";
    payment_status: "paid" | "pending" | "failed";
    delivery_address: string;
    phone: string;
    created_at: string;
}

const OrderHistory: React.FC = () => {
    const allOrders: Order[] = [
        {
            id: 1,
            user_id: 324,
            restaurant_id: 45,
            rider_id: 112,
            total_amount: 76.43,
            status: "preparing",
            payment_status: "paid",
            delivery_address: "123 Main St, City A",
            phone: "0123456789",
            created_at: "21/03/2025"
        },
        {
            id: 2,
            user_id: 215,
            restaurant_id: 17,
            rider_id: 348,
            total_amount: 45.87,
            status: "in transit",
            payment_status: "pending",
            delivery_address: "654 Elm St, City E",
            phone: "0198765432",
            created_at: "21/03/2025"
        },
        {
            id: 3,
            user_id: 451,
            restaurant_id: 23,
            rider_id: 419,
            total_amount: 98.12,
            status: "delivered",
            payment_status: "paid",
            delivery_address: "456 Maple Ave, City B",
            phone: "01711223344",
            created_at: "21/03/2025"
        },
        {
            id: 4,
            user_id: 389,
            restaurant_id: 81,
            rider_id: 206,
            total_amount: 22.34,
            status: "pending",
            payment_status: "failed",
            delivery_address: "789 Oak Dr, City C",
            phone: "01644332211",
            created_at: "21/03/2025"
        },
        {
            id: 5,
            user_id: 199,
            restaurant_id: 65,
            rider_id: 137,
            total_amount: 54.89,
            status: "cancelled",
            payment_status: "pending",
            delivery_address: "321 Pine Rd, City D",
            phone: "01855667788",
            created_at: "21/03/2025"
        },
        {
            id: 6,
            user_id: 301,
            restaurant_id: 37,
            rider_id: 289,
            total_amount: 66.15,
            status: "delivered",
            payment_status: "paid",
            delivery_address: "123 Main St, City A",
            phone: "01991122334",
            created_at: "21/03/2025"
        },
        {
            id: 7,
            user_id: 512,
            restaurant_id: 12,
            rider_id: 375,
            total_amount: 31.47,
            status: "preparing",
            payment_status: "pending",
            delivery_address: "654 Elm St, City E",
            phone: "01321234567",
            created_at: "21/03/2025"
        },
        {
            id: 8,
            user_id: 237,
            restaurant_id: 9,
            rider_id: 452,
            total_amount: 82.72,
            status: "in transit",
            payment_status: "failed",
            delivery_address: "789 Oak Dr, City C",
            phone: "01522334455",
            created_at: "21/03/2025"
        },
        {
            id: 9,
            user_id: 488,
            restaurant_id: 49,
            rider_id: 308,
            total_amount: 59.23,
            status: "delivered",
            payment_status: "paid",
            delivery_address: "456 Maple Ave, City B",
            phone: "01477889900",
            created_at: "21/03/2025"
        },
        {
            id: 10,
            user_id: 155,
            restaurant_id: 32,
            rider_id: 195,
            total_amount: 73.95,
            status: "preparing",
            payment_status: "pending",
            delivery_address: "321 Pine Rd, City D",
            phone: "01700998877",
            created_at: "21/03/2025"
        },
    ];

    // seperate based on status
    const pendingOrders = allOrders.filter(order => order.status === "pending");
    const preparingOrders = allOrders.filter(order => order.status === "preparing");
    const inTransitOrders = allOrders.filter(order => order.status === "in transit");
    const deliveredOrders = allOrders.filter(order => order.status === "delivered");
    const cancelledOrders = allOrders.filter(order => order.status === "cancelled");

    // Count orders by status
    const statusCount = allOrders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });

    return (
        <div>
            <section>
                <h1 className="uppercase text-2xl">Orders History</h1>
                <p>{`Hello, Gulam Jakaria. You have ${statusCount['pending']} pending orders.`}</p>
            </section>

            <section>
                <div className="tabs tabs-border mt-5">
                    <input type="radio" name="order_history_tab" className="tab" aria-label={`All`} defaultChecked />
                    <div className="tab-content bg-base-100 my-5">
                        <OrderHistoryTable orderHistory={allOrders}></OrderHistoryTable>
                    </div>

                    <input type="radio" name="order_history_tab" className="tab" aria-label={`Pending ${statusCount['pending']}`} />
                    <div className="tab-content bg-base-100 my-5">
                        <OrderHistoryTable orderHistory={pendingOrders}></OrderHistoryTable>
                    </div>

                    <input type="radio" name="order_history_tab" className="tab" aria-label={`Preparing ${statusCount['preparing']}`} />
                    <div className="tab-content bg-base-100 my-5">
                        <OrderHistoryTable orderHistory={preparingOrders}></OrderHistoryTable>
                    </div>

                    <input type="radio" name="order_history_tab" className="tab" aria-label={`In Transit ${statusCount['in transit']}`} />
                    <div className="tab-content bg-base-100 my-5">
                        <OrderHistoryTable orderHistory={inTransitOrders}></OrderHistoryTable>
                    </div>

                    <input type="radio" name="order_history_tab" className="tab" aria-label={`Delivered ${statusCount['delivered']}`} />
                    <div className="tab-content bg-base-100 my-5">
                        <OrderHistoryTable orderHistory={deliveredOrders}></OrderHistoryTable>
                    </div>

                    <input type="radio" name="order_history_tab" className="tab" aria-label={`Cancelled ${statusCount['cancelled']}`} />
                    <div className="tab-content bg-base-100 my-5">
                        <OrderHistoryTable orderHistory={cancelledOrders}></OrderHistoryTable>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderHistory;