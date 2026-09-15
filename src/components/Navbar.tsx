import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navItems = [
  { name: "Discover", target: "discover" },
  { name: "Categories", target: "categories" },
  { name: "Trending", target: "trending" },
];

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 flex flex-col gap-4 border-b border-gray-200/80 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <Link
  to="/"
  className="text-2xl font-extrabold tracking-tight text-gray-900 transition-transform duration-200 hover:scale-105"
>
  Local<span className="text-orange-500">Bite</span>
</Link>

      <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
        {navItems.map((item) => (
        <a
        href={`#${item.target}`}
        key={item.name}
        className="relative font-medium text-gray-600 transition-colors duration-200 hover:text-orange-500"
>
  {item.name}
</a>
        ))}
      <Link
  to="/cart"
  className="relative rounded-full px-3 py-2 text-lg transition-all duration-200 hover:bg-orange-50 hover:scale-105"
  title="Cart"
>
  🛒

  {cartItems.length > 0 && (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
      {cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      )}
    </span>
  )}
</Link>
        <Link
  to="/favorites"
  className="rounded-full px-3 py-2 text-lg transition-all duration-200 hover:bg-orange-50 hover:scale-105"
  title="Favorites"
>
  ❤️
</Link>

       {user ? (
  <>
    {user?.role !== "admin" && (
  <Link
    to="/orders"
    className="rounded-full px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
  >
    My Orders
  </Link>
)}

{user?.role === "admin" && (
  <Link
    to="/admin/orders"
    className="rounded-full px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
  >
    Admin Orders
  </Link>
)}

    <span className="rounded-full bg-orange-50 px-4 py-2 font-semibold text-gray-700">
      Hi, {user.name} 👋
    </span>

    <button
      onClick={logout}
      className="rounded-full px-4 py-2 font-semibold text-orange-500 transition-all duration-200 hover:bg-orange-50"
    >
      Logout
    </button>
  </>
) : (
          <Link
  to="/login"
  className="rounded-full bg-orange-500 px-5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:shadow-md active:scale-95"
>
  Login
</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;