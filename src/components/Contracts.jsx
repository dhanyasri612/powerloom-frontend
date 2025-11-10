import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useToast } from "./Toast";
import "./Contracts.css";

export default function Contracts(){
  const [form,setForm] = useState({ customerName:'', clothType:'', metersWeaved:0, ratePerMeter:0, deliveryDate:'' });
  const [contracts,setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetch = async () => { 
    const r = await api.get("/orders"); 
    setContracts(r.data); 
  };

  useEffect(()=>{ fetch(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const items = [{ product: null, meters: form.metersWeaved, pricePerMeter: form.ratePerMeter }];
    const total = form.metersWeaved * form.ratePerMeter;
    try {
      await api.post("/orders", {
        customerName: form.customerName,
        customerEmail: "",
        items,
        totalAmount: total,
        estimatedDelivery: form.deliveryDate
      });
      setForm({ customerName:'', clothType:'', metersWeaved:0, ratePerMeter:0, deliveryDate:'' });
      await fetch();
      toast.success("Contract added successfully!");
    } catch(error) {
      console.error(error);
      toast.error("Failed to add contract");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {/* Hero */}
      <div className="contracts-hero text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">Contracts & Deliveries</h1>
          <p className="lead">Manage your weekly deliveries and contract orders</p>
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          {/* Add Contract Form */}
          <div className="card border-0 shadow-lg mb-5 contract-form-card">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4">Add New Contract</h3>
              <form className="row g-4" onSubmit={handleAdd}>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Customer Name</label>
                  <input className="form-control form-control-lg" placeholder="Enter customer name" value={form.customerName} onChange={e=>setForm({...form,customerName:e.target.value})} required/>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Cloth Type</label>
                  <input className="form-control form-control-lg" placeholder="Kerala Saree, Uniform, etc." value={form.clothType} onChange={e=>setForm({...form,clothType:e.target.value})} required/>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Meters Required</label>
                  <input type="number" className="form-control form-control-lg" placeholder="Enter meters" value={form.metersWeaved} onChange={e=>setForm({...form,metersWeaved:Number(e.target.value)})} required/>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Rate Per Meter (₹)</label>
                  <input type="number" className="form-control form-control-lg" placeholder="Enter rate" value={form.ratePerMeter} onChange={e=>setForm({...form,ratePerMeter:Number(e.target.value)})} required/>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Delivery Date</label>
                  <input type="date" className="form-control form-control-lg" value={form.deliveryDate} onChange={e=>setForm({...form,deliveryDate:e.target.value})} required/>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary btn-lg px-5" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Contract'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Recent Deliveries */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Recent Deliveries</h4>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Customer</th>
                      <th>Meters</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map(c => (
                      <tr key={c._id}>
                        <td className="fw-semibold">{c.customerName}</td>
                        <td>{c.items?.reduce((s,i)=>s+(i.meters||0),0)}</td>
                        <td className="fw-bold text-primary">₹{c.totalAmount?.toLocaleString()}</td>
                        <td>{c.estimatedDelivery? new Date(c.estimatedDelivery).toLocaleDateString(): '-'}</td>
                        <td>
                          <span className={`badge bg-${
                            c.status === 'delivered' ? 'success' : 
                            c.status === 'cancelled' ? 'danger' : 
                            'warning'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
