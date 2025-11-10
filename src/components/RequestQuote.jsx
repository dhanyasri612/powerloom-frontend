import React, { useState } from "react";
import { createOrder } from "../api/api";

const RequestQuote = () => {
  const [form,setForm] = useState({ yarnType:"", quantity:1, patternImage:null });
  const [success,setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("yarnType", form.yarnType);
    formData.append("quantity", form.quantity);
    if(form.patternImage) formData.append("patternImage", form.patternImage);

    try{
      await createOrder(formData, token);
      setSuccess("Quote request submitted!");
    }catch(err){ console.error(err); }
  };

  return (
    <div className="container py-5">
      <h2>Request Quote</h2>
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Yarn Type</label>
          <input className="form-control" onChange={e=>setForm({...form, yarnType:e.target.value})} required />
        </div>
        <div className="mb-3">
          <label>Quantity</label>
          <input type="number" className="form-control" onChange={e=>setForm({...form, quantity:e.target.value})} required />
        </div>
        <div className="mb-3">
          <label>Pattern Upload</label>
          <input type="file" className="form-control" onChange={e=>setForm({...form, patternImage:e.target.files[0]})} />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default RequestQuote;
