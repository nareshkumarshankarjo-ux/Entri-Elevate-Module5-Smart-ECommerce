import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Shopping Cart</h2>

      {items.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty.{" "}
          <Link to="/products">Browse Products</Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>

                    <td>
                      ₹{item.price.toLocaleString("en-IN")}
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            dispatch(decreaseQuantity(item._id))
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            dispatch(increaseQuantity(item._id))
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>
                      ₹{(item.price * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          dispatch(removeFromCart(item._id))
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-end">
            Total: ₹{total.toLocaleString("en-IN")}
          </h4>

          <div className="d-flex justify-content-between mt-4">
            <Link to="/products" className="btn btn-outline-primary">
              Continue Shopping
            </Link>

            <button
              className="btn btn-outline-danger"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>

          <div className="d-flex justify-content-end mt-3">
  <Link
    to="/checkout"
    className="btn btn-success"
  >
    Proceed to Checkout
  </Link>
</div>
        </>
      )}
    </div>
  );
}