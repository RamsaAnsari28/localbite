import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderTotal, setPlacedOrderTotal] = useState(0);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.food.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 40 : 0;

  const grandTotal = subtotal + deliveryFee;
 const handlePlaceOrder = async () => {
  if (
    !name.trim() ||
    !phone.trim() ||
    !address.trim() ||
    !city.trim() ||
    !pincode.trim()
  ) {
    setError("Please fill in all delivery details.");
    return;
  }

  if (phone.trim().length !== 10) {
    setError("Please enter a valid 10-digit phone number.");
    return;
  }

  if (pincode.trim().length !== 6) {
    setError("Please enter a valid 6-digit pincode.");
    return;
  }

  try {
    setError("");

    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
        userId: user?.id,
        customerName: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        pincode: pincode.trim(),

        items: cartItems.map((item) => ({
          foodId: item.food.id,
          name: item.food.name,
          price: item.food.price,
          quantity: item.quantity,
        })),

        subtotal,
        deliveryFee,
        total: grandTotal,
        paymentMethod,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to place order.");
    }

    setPlacedOrderTotal(grandTotal);
    setOrderPlaced(true);
    clearCart();
  } catch (error) {
    console.error("Order error:", error);

    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong while placing your order."
    );
  }
};
if (orderPlaced) {
  return (
    <main className="min-h-screen bg-orange-50/30 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl">

        <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Order Placed!
          </h1>

          <p className="mt-3 text-gray-500">
            Thank you for ordering with LocalBite.
            Your food is being prepared.
          </p>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-left">
            <p className="text-sm text-gray-500">
              Payment Method
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Online Payment"}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Total Paid / Payable
            </p>

            <p className="mt-1 text-2xl font-bold text-orange-500">
              ₹{placedOrderTotal}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-8 rounded-full bg-orange-500 px-7 py-3 font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg active:scale-95"
          >
            Continue Exploring
          </button>

        </div>

      </div>
    </main>
  );
}
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-orange-50/30 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-2xl">

          <Link
            to="/"
            className="font-semibold text-orange-500 transition-colors hover:text-orange-600"
          >
            ← Back to LocalBite
          </Link>

          <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🛒</div>

            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h1>

            <p className="mt-2 text-gray-500">
              Add some food before proceeding to checkout.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition-all hover:bg-orange-600 active:scale-95"
            >
              Explore Food
            </Link>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50/30 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        <Link
          to="/cart"
          className="font-semibold text-orange-500 transition-colors hover:text-orange-600"
        >
          ← Back to Cart
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your delivery details to place your order.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Delivery Details */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-xl font-bold text-gray-900">
              Delivery Details
            </h2>

            <div className="mt-6 space-y-5">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="House / Flat number, Building, Street"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* City + Pincode */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Mumbai"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pincode"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Pincode
                  </label>

                  <input
                    id="pincode"
                    type="text"
                    value={pincode}
                    onChange={(event) => setPincode(event.target.value)}
                    placeholder="400053"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

              </div>

            </div>
          </section>
           
                       {/* Payment Method */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h2 className="text-xl font-bold text-gray-900">
                Payment Method
              </h2>

              <div className="mt-4 space-y-3">

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    paymentMethod === "cod"
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    className="accent-orange-500"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order arrives
                    </p>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    paymentMethod === "online"
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    className="accent-orange-500"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      Online Payment
                    </p>

                    <p className="text-sm text-gray-500">
                      Demo payment option
                    </p>
                  </div>
                </label>

              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-6">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.food.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-800">
                      {item.food.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      ₹{item.food.price} × {item.quantity}
                    </p>
                  </div>

                  <span className="shrink-0 font-semibold text-gray-900">
                    ₹{item.food.price * item.quantity}
                  </span>
                </div>
              ))}

              <div className="border-t border-gray-100 pt-4">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="mt-3 flex justify-between text-gray-600">
                  <span>Delivery fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
                  <span className="text-lg font-bold text-gray-900">
                    Total
                  </span>

                  <span className="text-xl font-bold text-orange-500">
                    ₹{grandTotal}
                  </span>
                </div>
                               <button
                type="button"
                onClick={handlePlaceOrder}
                className="mt-6 w-full rounded-full bg-orange-500 px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-95"
              >
                Place Order · ₹{grandTotal}
              </button>
              </div>

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Checkout;