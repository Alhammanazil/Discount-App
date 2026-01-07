import axios from "axios";

// API Configuration
const getApiBaseUrl = () => {
  const savedUrl = localStorage.getItem("apiBaseUrl");
  if (savedUrl) {
    return savedUrl;
  }
  return (
    import.meta.env.VITE_API_BASE_URL ||
    "https://crudcrud.com/api/1cc86d85321e4408b0284a914f5af84c"
  );
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to update API base URL dynamically
export const updateApiBaseUrl = (newUrl) => {
  api.defaults.baseURL = newUrl;
  localStorage.setItem("apiBaseUrl", newUrl);
};

// Discount API endpoints
export const discountAPI = {
  // Get all discounts
  getAll: () => api.get("/diskon"),

  // Get single discount by ID
  getById: (id) => api.get(`/diskon/${id}`),

  // Create new discount
  create: (data) => api.post("/diskon", data),

  // Update discount
  update: (id, data) => api.put(`/diskon/${id}`, data),

  // Delete discount
  delete: (id) => api.delete(`/diskon/${id}`),
};

export default api;
