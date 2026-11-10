import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";
import { clearCart } from "../redux/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  async function handlePlaceOrder() {
    if (loading) return;

    setError("");

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const orderItems = items.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    if (
      orderItems.length > 50 ||
      orderItems.some(
        (item) =>
          !/^[a-fA-F0-9]{24}$/.test(item.product) ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 ||
          item.quantity > 100
      )
    ) {
      setError(
        "Invalid cart items. Each quantity must be between 1 and 100."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/orders", {
        items: orderItems,
      });

      if (response.status !== 201 || !response.data?._id) {
        throw new Error("Unexpected order response.");
      }

      const orderId = response.data._id;

      dispatch(clearCart());

      navigate("/orders", {
        state: {
          success: true,
          orderId,
        },
      });
    } catch (err) {
      if (err.response?.status === 401) {
        setError(
          "Your login session was rejected. Please log out and sign in again."
        );
      } else if (err.response?.status === 403) {
        setError(
          "Your account is not authorized to place orders."
        );
      } else if (err.response?.status === 409) {
        setError(
          "One or more products may be out of stock. Please review your cart."
        );
      } else {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Order could not be confirmed. Check My Orders before retrying."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-5">
        <h2>Checkout</h2>

        <div className="alert alert-warning">
          Please log in before placing your order.
        </div>

        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <h2>Checkout</h2>

        <div className="alert alert-info">
          Your cart is empty.
        </div>

        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Checkout</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-4">Order Summary</h4>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>

                    <td>
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </td>

                    <td>{item.quantity}</td>

                    <td>
                      ₹{(
                        Number(item.price) * item.quantity
                      ).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-end text-primary">
            Estimated Total: ₹{total.toLocaleString("en-IN")}
          </h4>

          <p className="text-muted small mt-3">
            The server verifies product availability and calculates
            the final total from current database prices.
          </p>

          <div className="d-flex justify-content-between gap-2 mt-4">
            <Link
              to="/cart"
              className="btn btn-outline-secondary"
            >
              Back to Cart
            </Link>

            <button
              type="button"
              className="btn btn-success"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}