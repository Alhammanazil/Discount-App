import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { discountAPI } from "../services/api";

export const useDiscountStore = defineStore("discount", () => {
  const discounts = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const searchQuery = ref("");
  const selectedOutlet = ref("");

  // Fetch all discounts
  const fetchDiscounts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await discountAPI.getAll();
      discounts.value = response.data;
    } catch (err) {
      error.value = err.message || "Failed to fetch discounts";
      console.error("Error fetching discounts:", err);
    } finally {
      loading.value = false;
    }
  };

  // Get unique outlets from discounts
  const outlets = computed(() => {
    const outletSet = new Set();
    discounts.value.forEach((discount) => {
      if (discount.outlet) {
        outletSet.add(discount.outlet);
      }
    });
    return Array.from(outletSet);
  });

  // Filtered discounts based on search and outlet
  const filteredDiscounts = computed(() => {
    return discounts.value.filter((discount) => {
      const matchesSearch = discount.nama
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesOutlet =
        !selectedOutlet.value || discount.outlet === selectedOutlet.value;
      return matchesSearch && matchesOutlet;
    });
  });

  // Create discount
  const createDiscount = async (discountData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await discountAPI.create(discountData);
      discounts.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        err.message ||
        "Failed to create discount";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Update discount
  const updateDiscount = async (id, discountData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await discountAPI.update(id, discountData);
      const index = discounts.value.findIndex((d) => d._id === id);
      if (index !== -1) {
        discounts.value[index] = response.data;
      }
      return response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        err.message ||
        "Failed to update discount";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Delete discount
  const deleteDiscount = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await discountAPI.delete(id);
      discounts.value = discounts.value.filter((d) => d._id !== id);
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete discount";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    discounts,
    loading,
    error,
    searchQuery,
    selectedOutlet,
    outlets,
    filteredDiscounts,
    fetchDiscounts,
    createDiscount,
    updateDiscount,
    deleteDiscount,
  };
});
