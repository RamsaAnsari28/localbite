import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, addToCart, decreaseQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.food.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 40 : 0;

  const grandTotal = subtotal + deliveryFee;

  return (
    <main className="min-h-screen bg-orange-50/30 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        <Link
          to="/"
          className="mb-6 inline-flex items-center font-semibold text-orange-500 transition-colors hover:text-orange-600"
        >
          ← Back to LocalBite
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">
          Your Cart
        </h1>

        <p className="mt-2 text-gray-500">
          {cartItems.length === 0
            ? "Your cart is empty."
            : `${cartItems.length} item${
                cartItems.length > 1 ? "s" : ""
              } in your cart`}
        </p>

        {cartItems.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🛒</div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some delicious food to get started.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-95"
            >
              Explore Food
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">

            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.food.id}
                  className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <img
                    src={item.food.image}
                    alt={item.food.name}
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-gray-900">
                      {item.food.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      ₹{item.food.price} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.food.id)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-100 active:scale-95"
                      >
                        −
                      </button>

                      <span className="min-w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => addToCart(item.food)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white transition hover:bg-orange-600 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="shrink-0 text-right">
                    <p className="font-bold text-gray-900">
                      ₹{item.food.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Grand Total
                    </span>

                    <span className="text-xl font-bold text-orange-500">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>

              </div>

              <Link
              to="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-95"
                >
              Proceed to Checkout
              </Link>

              <p className="mt-3 text-center text-xs text-gray-400">
                Taxes and additional charges may apply.
              </p>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;