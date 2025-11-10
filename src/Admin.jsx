import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Products</h5>
              <p className="card-text">Add, edit, or delete products.</p>
              <Link to="/manage-products" className="btn btn-primary">Go</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Orders</h5>
              <p className="card-text">View and update orders.</p>
              <Link to="/manage-orders" className="btn btn-primary">Go</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Analytics</h5>
              <p className="card-text">View business analytics.</p>
              <Link to="/dashboard" className="btn btn-primary">Go</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Add more admin features as needed */}
    </div>
  );
}