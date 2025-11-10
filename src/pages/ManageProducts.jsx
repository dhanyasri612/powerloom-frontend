import React, { useState, useEffect } from "react";
import api, {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "../services/api";
import { useToast } from "../components/Toast";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    pricePerMeter: "",
    stockMeters: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    pricePerMeter: "",
    stockMeters: "",
  });
  const [newProductFile, setNewProductFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditId(product._id);
    setEditData({
      name: product.name,
      pricePerMeter: product.pricePerMeter || 0,
      stockMeters: product.stockMeters || 0,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(editId, editData);
      setEditId(null);
      await fetchProducts();
      toast.success("Product updated successfully!");
    } catch (err) {
      toast.error("Failed to update product");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(id);
      await fetchProducts();
      toast.success("Product deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete product");
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      let uploadedImagePath = "";
      if (newProductFile) {
        const uploadRes = await uploadImage(newProductFile);
        uploadedImagePath = uploadRes.data?.path || "";
      }
      const payload = {
        name: newProduct.name,
        pricePerMeter: Number(newProduct.pricePerMeter) || 0,
        stockMeters: Number(newProduct.stockMeters) || 0,
        ...(uploadedImagePath ? { images: [uploadedImagePath] } : {}),
      };
      await createProduct(payload);
      setNewProduct({
        name: "",
        pricePerMeter: "",
        stockMeters: "",
      });
      setNewProductFile(null);
      await fetchProducts();
      toast.success("Product created successfully!");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create product";
      toast.error(msg);
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-4 fade-in">
      <h3 className="mb-4">Manage Products</h3>
      <form className="row g-2 mb-4" onSubmit={handleCreate}>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Price/Meter"
            type="number"
            value={newProduct.pricePerMeter}
            onChange={(e) =>
              setNewProduct({ ...newProduct, pricePerMeter: e.target.value })
            }
            min="0"
            step="0.01"
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Stock (Meters)"
            type="number"
            value={newProduct.stockMeters}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stockMeters: e.target.value })
            }
            min="0"
            step="1"
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => setNewProductFile(e.target.files?.[0] || null)}
          />
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-success">
            Add Product
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price/Meter</th>
              <th>Stock (Meters)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                {editId === p._id ? (
                  <>
                    <td>
                      <input
                        className="form-control"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        placeholder="Name"
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={editData.pricePerMeter}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            pricePerMeter: e.target.value,
                          })
                        }
                        placeholder="Price"
                        type="number"
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={editData.stockMeters}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            stockMeters: e.target.value,
                          })
                        }
                        placeholder="Stock"
                        type="number"
                      />
                    </td>
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
                    <td>{p.name}</td>
                    <td>₹{p.pricePerMeter || 0}</td>
                    <td>{p.stockMeters || 0}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(p._id)}
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
