import React, { useState, useEffect } from "react";
import api, { createOrder, updateOrder, deleteOrder } from "../services/api";
import { useToast } from "../components/Toast";
import LoadingSpinner from "../components/LoadingSpinner";

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "weaving",
  "quality",
  "dispatched",
  "delivered",
  "cancelled",
];

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ status: "", amountSettled: "" });
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    customerEmail: "",
    productId: "",
    meters: "",
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // load products for creating order items
    api
      .get("/products")
      .then((r) => setProducts(r.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (order) => {
    setEditId(order._id);
    setEditData({
      status: order.status,
      amountSettled: order.amountSettled || 0,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateOrder(editId, editData);
      setEditId(null);
      await fetchOrders();
      toast.success("Order updated successfully!");
    } catch (err) {
      toast.error("Failed to update order");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder(id);
      await fetchOrders();
      toast.success("Order deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete order");
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (
        !newOrder.productId ||
        !newOrder.meters ||
        Number(newOrder.meters) <= 0
      ) {
        toast.error("Select a product and enter meters > 0");
        return;
      }
      const payload = {
        customerName: newOrder.customerName,
        customerEmail: newOrder.customerEmail,
        items: [
          {
            product: newOrder.productId,
            meters: Number(newOrder.meters),
          },
        ],
      };
      await createOrder(payload);
      setNewOrder({
        customerName: "",
        customerEmail: "",
        productId: "",
        meters: "",
      });
      await fetchOrders();
      toast.success("Order created successfully!");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create order";
      toast.error(msg);
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-4 fade-in">
      <h3 className="mb-4">Manage Orders</h3>
      <form className="row g-2 mb-4" onSubmit={handleCreate}>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Customer Name"
            value={newOrder.customerName}
            onChange={(e) =>
              setNewOrder({ ...newOrder, customerName: e.target.value })
            }
            required
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Customer Email"
            type="email"
            value={newOrder.customerEmail}
            onChange={(e) =>
              setNewOrder({ ...newOrder, customerEmail: e.target.value })
            }
            required
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={newOrder.productId}
            onChange={(e) =>
              setNewOrder({ ...newOrder, productId: e.target.value })
            }
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Meters"
            type="number"
            min="1"
            value={newOrder.meters}
            onChange={(e) =>
              setNewOrder({ ...newOrder, meters: e.target.value })
            }
            required
          />
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-success">
            Add Order
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Total Amount</th>
              <th>Amount Settled</th>
              <th>Status</th>
              <th>Placed At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                {editId === o._id ? (
                  <>
                    <td>{o.customerName}</td>
                    <td>{o.customerEmail}</td>
                    <td>₹{o.totalAmount}</td>
                    <td>
                      <input
                        className="form-control"
                        value={editData.amountSettled}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            amountSettled: e.target.value,
                          })
                        }
                        placeholder="Amount Settled"
                        type="number"
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={editData.status}
                        onChange={(e) =>
                          setEditData({ ...editData, status: e.target.value })
                        }
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{new Date(o.placedAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{o.customerName}</td>
                    <td>{o.customerEmail}</td>
                    <td>₹{o.totalAmount}</td>
                    <td>₹{o.amountSettled || 0}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          o.status === "delivered"
                            ? "success"
                            : o.status === "cancelled"
                            ? "danger"
                            : "warning"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td>{new Date(o.placedAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(o)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(o._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
