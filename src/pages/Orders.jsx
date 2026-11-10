import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "../api/axios";

export default function Orders() {
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    let active = true;

    async function fetchOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/orders");

        if (active) {
          setOrders(
            Array.isArray(response.data)
              ? response.data
              : []
          );
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to load orders."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container py-5">
        <h2>My Orders</h2>
        <div className="alert alert-warning">
          Please log in to view your orders.
        </div>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">My Orders</h2>

      {location.state?.success && (
        <div className="alert alert-success">
          <strong>Order placed successfully!</strong>
          <div className="mt-2">
            Order ID: {location.state.orderId}
          </div>
        </div>
      )}

      {loading && (
        <div className="alert alert-info">
          Loading your orders...
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="alert alert-info">
          No orders found.
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <code>{order._id}</code>
                  </td>

                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt)
                          .toLocaleString("en-IN")
                      : "N/A"}
                  </td>

                  <td>
                    <span className="badge bg-primary">
                      {order.status || "Unknown"}
                    </span>
                  </td>

                  <td>
                    ₹{Number(order.total ?? 0)
                      .toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link
        to="/products"
        className="btn btn-outline-primary mt-3"
      >
        Continue Shopping
      </Link>
    </div>
  );
}