import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/dashboard/user");
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <div>
        {orders.length === 0 && <p>No orders placed yet.</p>}
        {orders.map(o => (
          <div key={o._id} className="order-card">
            <strong>{o.productName || "Product"}</strong> - ₹{o.totalAmount}
            <br />
            Status: {o.status}
            <br />
            Placed At: {new Date(o.placedAt).toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
}
