import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaStore } from "react-icons/fa";

import { logout } from "../redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authenticated user information from Redux
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // Get shopping cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total number of products in cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Logout function
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("ecommerce_auth");

    dispatch(logout());
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          <FaStore className="me-2" />
          Smart E-Commerce
        </Link>

        {/* Mobile Navigation */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#storeNavbar"
          aria-controls="storeNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse"
          id="storeNavbar"
        >
          <div className="navbar-nav ms-auto align-items-lg-center">

            {/* Home */}
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>

            {/* Products */}
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>

            {/* Shopping Cart */}
            <NavLink className="nav-link" to="/cart">
              <FaShoppingCart className="me-1" />
              Cart ({cartCount})
            </NavLink>

            {/* Contact */}
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>

            {/* My Orders - Visible only after login */}
            {isAuthenticated && (
              <NavLink className="nav-link" to="/orders">
                My Orders
              </NavLink>
            )}

            {isAuthenticated && (
              <NavLink className="nav-link" to="/recommendations">
              Recommendations
              </NavLink>
            )}

            {/* Authentication Navigation */}
            {isAuthenticated ? (
              <>
                <span className="navbar-text text-white mx-lg-3">
                  Welcome, {user?.name || "Customer"}
                </span>

                <button
                  type="button"
                  className="btn btn-outline-light btn-sm ms-lg-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>

                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}