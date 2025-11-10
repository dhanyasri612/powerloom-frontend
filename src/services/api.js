import axios from "axios";

// Use environment variable in production, fallback to Render URL, and finally localhost for local dev
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://powerloom-backend.onrender.com"; // ✅ your Render backend URL

// Create a single axios instance
const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true, // allow cookies / auth tokens if needed
});

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/images/placeholder.png";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE}${imagePath}`;
};

// =======================
// 🔹 Product APIs
// =======================
export const createProduct = (data) => api.post(`/products`, data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// =======================
// 🔹 Upload API
// =======================
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return api.post(`/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// =======================
// 🔹 Order APIs
// =======================
export const createOrder = (data) => api.post(`/orders`, data);
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// =======================
// 🔹 Loom APIs
// =======================
export const getLooms = () => api.get(`/looms`);
export const updateLoom = (loomId, data) => api.put(`/looms/${loomId}`, data);

// Export axios instance
export default api;
