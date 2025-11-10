import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);

    api.get("/orders")
      .then(res => {
        const userOrders = res.data.filter(o => o.customerEmail === userData.email);
        setOrders(userOrders);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" 
                     style={{ width: "100px", height: "100px", fontSize: "2.5rem" }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <h4 className="mb-1">{user?.name}</h4>
              <p className="text-muted mb-3">{user?.email}</p>
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="card shadow-sm mt-3">
            <div className="card-body">
              <h6 className="mb-3">Account Details</h6>
              <div className="mb-2">
                <small className="text-muted">Member Since</small>
                <p className="mb-0">January 2025</p>
              </div>
              <div className="mb-2">
                <small className="text-muted">Total Orders</small>
                <p className="mb-0">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-4">My Orders</h5>
              {orders.length === 0 ? (
                <p className="text-muted">No orders yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order._id}>
                          <td><small>{order._id.slice(-8)}</small></td>
                          <td>{new Date(order.placedAt).toLocaleDateString()}</td>
                          <td>₹{order.totalAmount}</td>
                          <td>
                            <span className={`badge bg-${
                              order.status === 'delivered' ? 'success' :
                              order.status === 'cancelled' ? 'danger' :
                              order.status === 'dispatched' ? 'info' :
                              'warning'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
