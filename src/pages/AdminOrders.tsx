import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const statuses = [
  "Placed",
  "Preparing",
  "Out for delivery",
  "Delivered",
  "Cancelled",
] as const;

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(
    null
  );
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/orders`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }

      const data = await response.json();

      setOrders(data);
    } catch (error) {
      console.error("Admin orders error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    orderId: string,
    status: Order["status"]
  ) => {
    try {
      setUpdatingOrderId(orderId);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update order status."
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: data.order.status }
            : order
        )
      );
    } catch (error) {
      console.error("Status update error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update order status."
      );
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50/30 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        <Link
          to="/"
          className="font-semibold text-orange-500 transition-colors hover:text-orange-600"
        >
          ← Back to LocalBite
        </Link>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Orders
            </h1>

            <p className="mt-2 text-gray-500">
              Manage LocalBite orders and update their status.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchOrders}
            className="w-fit rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-500"
          >
            Refresh Orders
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              Loading orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">📦</div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              New customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Order ID
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label
                      htmlFor={`status-${order._id}`}
                      className="text-sm font-semibold text-gray-600"
                    >
                      Status
                    </label>

                    <select
                      id={`status-${order._id}`}
                      value={order.status}
                      disabled={updatingOrderId === order._id}
                      onChange={(event) =>
                        updateStatus(
                          order._id,
                          event.target.value as Order["status"]
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:opacity-60"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    {updatingOrderId === order._id && (
                      <span className="text-xs text-gray-400">
                        Updating...
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 grid gap-5 border-t border-gray-100 pt-6 lg:grid-cols-[1fr_280px]">

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Customer
                    </h2>

                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p>{order.customerName}</p>
                      <p>{order.phone}</p>
                      <p>
                        {order.address}, {order.city} -{" "}
                        {order.pincode}
                      </p>
                    </div>

                    <h2 className="mt-6 font-bold text-gray-900">
                      Items
                    </h2>

                    <div className="mt-3 space-y-3">
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

                  <div className="h-fit rounded-2xl bg-orange-50 p-5">
                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Online Payment"}
                    </p>

                    <div className="mt-5 border-t border-orange-100 pt-4">
                      <p className="text-sm text-gray-500">
                        Order Total
                      </p>

                      <p className="mt-1 text-2xl font-bold text-orange-500">
                        ₹{order.total}
                      </p>
                    </div>
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

export default AdminOrders;