import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

interface OrderItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: "cod" | "online";
  status:
    | "Placed"
    | "Preparing"
    | "Out for delivery"
    | "Delivered"
    | "Cancelled";
  createdAt: string;
}
const orderStatuses = [
  "Placed",
  "Preparing",
  "Out for delivery",
  "Delivered",
] as const;

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/orders/user/${user.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.error("Orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  return (
    <main className="min-h-screen bg-orange-50/30 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/"
          className="font-semibold text-orange-500 transition-colors hover:text-orange-600"
        >
          ← Back to LocalBite
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          View your previous LocalBite orders.
        </p>

        {loading ? (
          <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              Loading your orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">

            <div className="text-5xl">🍽️</div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your previous orders will appear here.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition-all hover:bg-orange-600 active:scale-95"
            >
              Explore Food
            </Link>

          </div>
        ) : (
          <div className="mt-8 space-y-5">

            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-bold text-gray-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {order.status === "Cancelled" ? (
  <span className="w-fit rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
    Cancelled
  </span>
) : (
  <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
    {order.status}
  </span>
)}

                </div>
                {/* Order Status Tracker */}
{order.status !== "Cancelled" && (
  <div className="mt-6 border-t border-gray-100 pt-6">
    <h3 className="text-sm font-bold text-gray-900">
      Order Status
    </h3>

    <div className="mt-5 flex items-start">
      {orderStatuses.map((status, index) => {
        const currentIndex = orderStatuses.indexOf(
          order.status as (typeof orderStatuses)[number]
        );

        const isCompleted = index <= currentIndex;
        const isLast = index === orderStatuses.length - 1;

        return (
          <div
            key={status}
            className="flex flex-1 items-start"
          >
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                  isCompleted
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              <p
                className={`mt-2 text-center text-xs font-semibold ${
                  isCompleted
                    ? "text-orange-600"
                    : "text-gray-400"
                }`}
              >
                {status}
              </p>
            </div>

            {!isLast && (
              <div
                className={`mt-4 h-1 flex-1 rounded-full ${
                  index < currentIndex
                    ? "bg-orange-500"
                    : "bg-gray-100"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
)}

                <div className="mt-5 border-t border-gray-100 pt-5">

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.foodId}
                        className="flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold text-gray-900">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <p className="font-semibold text-gray-800">
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Online Payment"}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="text-xl font-bold text-orange-500">
                      ₹{order.total}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

export default Orders;