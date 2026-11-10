import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container py-5 text-center">
      <div className="p-5 bg-white rounded shadow-sm">
        <h1 className="display-5 fw-bold text-primary">
          Welcome to Smart E-Commerce
        </h1>

        <p className="lead mt-3">
          Explore quality products powered by our MERN Stack application.
        </p>

        <p className="text-muted">
          Entri Elevate | Module 5 | Batch FN31
        </p>

        <Link to="/products" className="btn btn-primary btn-lg mt-3">
          Shop Now
        </Link>
      </div>
    </div>
  );
}