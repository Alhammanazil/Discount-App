<template>
    <div class="page-container">
        <!-- Main Content Card -->
        <div class="content-card">
            <!-- Header Section -->
            <div class="header-section">
                <div class="title-section">
                    <h1 class="page-title">Daftar Diskon</h1>
                    <p class="subtitle" v-if="!isEmptyState">Total jumlah diskon: {{ discountStore.discounts.length }}
                    </p>
                </div>
                <!-- Action buttons when items selected -->
                <div v-if="selectedDiscounts.length > 0" class="header-actions">
                    <button class="btn btn-outline" @click="selectedDiscounts = []">Batalkan</button>
                    <button class="btn btn-danger" @click="deleteSelectedDiscounts">Hapus</button>
                </div>
            </div>

            <!-- Alert Component -->
            <Alert :message="alertMessage" :type="alertType" />

            <!-- Loading State -->
            <div v-if="isLoading" class="loading-container">
                <div class="loading-skeleton">
                    <div class="skeleton-line" style="width: 40%; height: 28px; margin-bottom: 24px;"></div>
                    <div class="skeleton-line" style="width: 100%; height: 400px; border-radius: 8px;"></div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="isEmptyState" class="empty-state-container">
                <!-- Filter Chip (Empty State) -->
                <div class="filter-action">
                    <div class="filter-chip" @click="openApiSettings">
                        <svg class="start-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.71 6.285L15.2314 4.035C15.0145 3 14.0873 2.25 13.0404 2.25H4.97194C3.91758 2.25 2.99782 3 2.77349 4.035L2.30239 6.285C2.16032 6.9525 2.32483 7.635 2.75106 8.1675C3.02026 8.4975 3.37919 8.73 3.76803 8.865V13.5C3.76803 14.7375 4.77752 15.75 6.01135 15.75H11.9935C13.2274 15.75 14.2369 14.7375 14.2369 13.5V8.865C14.6332 8.73 14.9846 8.4975 15.2538 8.1675C15.6801 7.635 15.8446 6.9525 15.7025 6.285H15.71ZM7.95556 3.75H10.0568L10.2662 6.6975C10.2811 6.9075 10.2138 7.11 10.0643 7.26C9.9222 7.4175 9.72778 7.5 9.5184 7.5H8.49396C8.28458 7.5 8.09016 7.4175 7.94808 7.26C7.806 7.1025 7.73123 6.9075 7.74618 6.6975L7.95556 3.75ZM4.23913 4.3425C4.3139 3.9975 4.62049 3.75 4.97194 3.75H6.45254L6.25064 6.5925L6.23568 6.8025C6.20577 7.1925 5.87675 7.5 5.48791 7.5H4.49337C4.26904 7.5 4.05218 7.395 3.91011 7.2225C3.76803 7.0425 3.71569 6.8175 3.76055 6.5925L4.23913 4.3425ZM8.25467 14.25V12.75C8.25467 12.3375 8.59117 12 9.00244 12C9.41372 12 9.75021 12.3375 9.75021 12.75V14.25H8.25467ZM11.9935 14.25H11.2458V12.75C11.2458 11.5125 10.2363 10.5 9.00244 10.5C7.76862 10.5 6.75912 11.5125 6.75912 12.75V14.25H6.01135C5.60007 14.25 5.26358 13.9125 5.26358 13.5V9H5.48791C6.06369 9 6.59461 8.775 6.99093 8.415C7.40221 8.7825 7.93313 9 8.48648 9H9.51093C10.0643 9 10.5952 8.7825 11.0065 8.415C11.4103 8.7825 11.9337 9 12.5095 9H12.7338V13.5C12.7338 13.9125 12.3973 14.25 11.9861 14.25H11.9935ZM14.0948 7.2225C13.9527 7.4025 13.7433 7.5 13.5115 7.5H12.517C12.1281 7.5 11.7991 7.1925 11.7692 6.8025L11.7542 6.5925L11.5523 3.75H13.0329C13.3844 3.75 13.691 3.9975 13.7658 4.3425L14.2443 6.5925C14.2892 6.8175 14.2369 7.0425 14.0948 7.2225Z"
                                fill="#4B5258" />
                        </svg>
                        <span class="filter-label">Kopi Anak Bangsa</span>
                        <svg class="end-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 7.5L9 12L13.5 7.5" stroke="#4B5258" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>

                <div class="empty-state">
                    <img src="../assets/icons/iconDiscount.svg" alt="Belum Ada Diskon" class="empty-state-icon" />
                    <h2>Belum Ada Diskon</h2>
                    <p>Silahkan tambah diskon untuk menarik pelanggan dan meningkatkan penjualan.</p>
                    <button class="btn btn-primary" @click="openAddModal">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                            style="margin-right: 4px;">
                            <path d="M9 3.75V14.25M3.75 9H14.25" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" />
                        </svg>
                        Tambah diskon
                    </button>
                </div>
            </div>

            <!-- Content (when not empty) -->
            <template v-else>
                <!-- Toolbar -->
                <div class="toolbar">
                    <!-- Left: Search and Filter -->
                    <div class="toolbar-left">
                        <!-- Search Box (FIRST) -->
                        <div class="search-box">
                            <svg class="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
                                    stroke="#999999" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M15.75 15.75L12.4875 12.4875" stroke="#999999" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <input v-model="searchQuery" type="text" placeholder="Cari diskon" class="search-input" />
                        </div>

                        <!-- Filter Chip (SECOND) -->
                        <div class="filter-chip" @click="openApiSettings">
                            <svg class="start-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.71 6.285L15.2314 4.035C15.0145 3 14.0873 2.25 13.0404 2.25H4.97194C3.91758 2.25 2.99782 3 2.77349 4.035L2.30239 6.285C2.16032 6.9525 2.32483 7.635 2.75106 8.1675C3.02026 8.4975 3.37919 8.73 3.76803 8.865V13.5C3.76803 14.7375 4.77752 15.75 6.01135 15.75H11.9935C13.2274 15.75 14.2369 14.7375 14.2369 13.5V8.865C14.6332 8.73 14.9846 8.4975 15.2538 8.1675C15.6801 7.635 15.8446 6.9525 15.7025 6.285H15.71ZM7.95556 3.75H10.0568L10.2662 6.6975C10.2811 6.9075 10.2138 7.11 10.0643 7.26C9.9222 7.4175 9.72778 7.5 9.5184 7.5H8.49396C8.28458 7.5 8.09016 7.4175 7.94808 7.26C7.806 7.1025 7.73123 6.9075 7.74618 6.6975L7.95556 3.75ZM4.23913 4.3425C4.3139 3.9975 4.62049 3.75 4.97194 3.75H6.45254L6.25064 6.5925L6.23568 6.8025C6.20577 7.1925 5.87675 7.5 5.48791 7.5H4.49337C4.26904 7.5 4.05218 7.395 3.91011 7.2225C3.76803 7.0425 3.71569 6.8175 3.76055 6.5925L4.23913 4.3425ZM8.25467 14.25V12.75C8.25467 12.3375 8.59117 12 9.00244 12C9.41372 12 9.75021 12.3375 9.75021 12.75V14.25H8.25467ZM11.9935 14.25H11.2458V12.75C11.2458 11.5125 10.2363 10.5 9.00244 10.5C7.76862 10.5 6.75912 11.5125 6.75912 12.75V14.25H6.01135C5.60007 14.25 5.26358 13.9125 5.26358 13.5V9H5.48791C6.06369 9 6.59461 8.775 6.99093 8.415C7.40221 8.7825 7.93313 9 8.48648 9H9.51093C10.0643 9 10.5952 8.7825 11.0065 8.415C11.4103 8.7825 11.9337 9 12.5095 9H12.7338V13.5C12.7338 13.9125 12.3973 14.25 11.9861 14.25H11.9935ZM14.0948 7.2225C13.9527 7.4025 13.7433 7.5 13.5115 7.5H12.517C12.1281 7.5 11.7991 7.1925 11.7692 6.8025L11.7542 6.5925L11.5523 3.75H13.0329C13.3844 3.75 13.691 3.9975 13.7658 4.3425L14.2443 6.5925C14.2892 6.8175 14.2369 7.0425 14.0948 7.2225Z"
                                    fill="#4B5258" />
                            </svg>
                            <span class="filter-label">Kopi Anak Bangsa</span>
                            <svg class="end-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.5 7.5L9 12L13.5 7.5" stroke="#4B5258" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <!-- Add Button -->
                    <button class="btn btn-primary" @click="openAddModal">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                            style="margin-right: 4px;">
                            <path d="M9 3.75V14.25M3.75 9H14.25" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" />
                        </svg>
                        Tambah diskon
                    </button>
                </div>

                <!-- Table with Sorting & Pagination -->
                <div class="table-container">
                    <table class="discount-table">
                        <thead>
                            <tr>
                                <th style="width: 50px">
                                    <input type="checkbox" class="table-checkbox" :checked="allSelected"
                                        @change="toggleSelectAll" />
                                </th>
                                <th class="sortable" @click="sortBy('nama')">
                                    <div class="th-content">
                                        <span>Nama Diskon</span>
                                        <span class="sort-indicator">
                                            <svg v-if="sortColumn === 'nama' && sortDirection === 'asc'" width="12"
                                                height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M6 3L9 7H3L6 3Z" fill="#3EAE30" />
                                            </svg>
                                            <svg v-else-if="sortColumn === 'nama' && sortDirection === 'desc'"
                                                width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M6 9L3 5H9L6 9Z" fill="#3EAE30" />
                                            </svg>
                                            <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M6 3L9 7H3L6 3Z" fill="#CDD2D5" />
                                            </svg>
                                        </span>
                                    </div>
                                </th>
                                <th class="sortable" @click="sortBy('nilai')">
                                    <div class="th-content">
                                        <span>Nilai Diskon</span>
                                        <span class="sort-indicator">
                                            <svg v-if="sortColumn === 'diskon' && sortDirection === 'asc'" width="12"
                                                height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M6 3L9 7H3L6 3Z" fill="#3EAE30" />
                                            </svg>
                                            <svg v-else-if="sortColumn === 'diskon' && sortDirection === 'desc'"
                                                width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M6 9L3 5H9L6 9Z" fill="#3EAE30" />
                                            </svg>
                                            <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M6 3L9 7H3L6 3Z" fill="#CDD2D5" />
                                            </svg>
                                        </span>
                                    </div>
                                </th>
                                <th style="width: 60px">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="discount in paginatedDiscounts" :key="discount._id">
                                <td>
                                    <input type="checkbox" class="table-checkbox"
                                        :checked="selectedDiscounts.includes(discount._id)"
                                        @change="toggleSelectDiscount(discount._id)" />
                                </td>
                                <td>
                                    <div class="discount-name">
                                        {{ discount.nama }}
                                        <span v-if="discount.isNew" class="badge badge-new">baru</span>
                                    </div>
                                </td>
                                <td>{{ formatDiscount(discount) }}</td>
                                <td>
                                    <button class="btn-action btn-edit" @click="openEditModal(discount)"
                                        title="Edit diskon">
                                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M21.4194 20.35H18.086C17.6277 20.35 17.2527 20.725 17.2527 21.1834C17.2527 21.6417 17.6277 22.0167 18.086 22.0167H21.4194C21.8777 22.0167 22.2527 21.6417 22.2527 21.1834C22.2527 20.725 21.8777 20.35 21.4194 20.35Z"
                                                fill="currentColor" />
                                            <path
                                                d="M19.8944 15.9917L20.7777 15.1084C21.3277 14.5584 21.636 13.825 21.636 13.05C21.636 12.275 21.336 11.5417 20.786 10.9917C19.686 9.89169 17.761 9.89169 16.661 10.9917L10.7277 16.9084C10.011 17.6334 9.66103 18.625 9.76936 19.6334L9.92769 21.0917C9.96936 21.475 10.2777 21.7834 10.661 21.825L12.1194 21.9834C12.2444 22 12.3694 22 12.4944 22C13.3777 22 14.2194 21.6584 14.8444 21.025L19.886 15.9834L19.8944 15.9917ZM19.6027 12.1667C19.836 12.4 19.9694 12.7167 19.9694 13.05C19.9694 13.3834 19.836 13.7 19.6027 13.9334L19.311 14.225L17.5444 12.4584L17.836 12.1667C18.311 11.6917 19.1277 11.6917 19.6027 12.1667ZM13.6777 19.8584C13.3194 20.2167 12.8194 20.3917 12.3194 20.3334L11.5277 20.2417L11.436 19.45C11.3777 18.9417 11.5527 18.45 11.911 18.0834L16.361 13.6334L18.1277 15.4L13.6777 19.85V19.8584Z"
                                                fill="currentColor" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination -->
                    <div class="pagination-container">
                        <div class="pagination-info">
                            <select v-model.number="itemsPerPage" class="page-size-select">
                                <option :value="10">10</option>
                                <option :value="25">25</option>
                                <option :value="50">50</option>
                                <option :value="100">100</option>
                            </select>
                            <span class="pagination-text">data per halaman</span>
                        </div>

                        <div class="pagination-controls">
                            <button class="page-btn" :disabled="currentPage === 1" @click="currentPage = 1">
                                &laquo;
                            </button>
                            <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
                                &lsaquo;
                            </button>

                            <button v-for="page in visiblePages" :key="page" class="page-btn"
                                :class="{ active: currentPage === page }" @click="currentPage = page">
                                {{ page }}
                            </button>

                            <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
                                &rsaquo;
                            </button>
                            <button class="page-btn" :disabled="currentPage === totalPages"
                                @click="currentPage = totalPages">
                                &raquo;
                            </button>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Modals -->

            <!-- Footer -->
            <footer class="page-footer">
                <p>&copy; 2026 All rights reserved.</p>
            </footer>
            <DiscountModal :isOpen="showAddModal" :isEdit="false" @close="closeAddModal" @submit="handleAddDiscount" />

            <DiscountModal :isOpen="showEditModal" :isEdit="true" :initialData="editingDiscount" @close="closeEditModal"
                @submit="handleEditDiscount" @delete="handleDeleteFromModal" />

            <ApiSettingsModal :isOpen="showApiSettings" @close="closeApiSettings" @apply="handleApiSettingsApply" />

            <ConfirmModal :isOpen="showDeleteConfirm" title="Hapus Diskon" :message="deleteConfirmMessage"
                :details="deleteConfirmDetails" confirmText="Hapus" cancelText="Batalkan" :showWarning="true"
                @close="closeDeleteConfirm" @confirm="confirmDelete" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useDiscountStore } from '../stores/discountStore'
import DiscountModal from '../components/DiscountModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import Alert from '../components/Alert.vue'
import ApiSettingsModal from '../components/ApiSettingsModal.vue'
import { updateApiBaseUrl } from '../services/api'

const discountStore = useDiscountStore()

// Constants
const DEFAULT_ITEMS_PER_PAGE = 10
const NEW_BADGE_DURATION = 5000
const PAGINATION_MAX_PAGES = 5

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteConfirm = ref(false)
const showApiSettings = ref(false)
const editingDiscount = ref(null)
const selectedDiscounts = ref([])
const alertMessage = ref('')
const alertType = ref('success')
const isLoading = ref(true)
const deleteConfirmDetails = ref([])
const deleteConfirmMessage = ref('')
const discountToDelete = ref(null)
const isMultipleDelete = ref(false)

// Pagination & Sorting
const currentPage = ref(1)
const itemsPerPage = ref(DEFAULT_ITEMS_PER_PAGE)
const sortColumn = ref('createdAt')
const sortDirection = ref('desc')
const searchQuery = ref('')

// Reset to page 1 when search query changes
watch(searchQuery, () => {
    currentPage.value = 1
})

// Reset to page 1 when items per page changes
watch(itemsPerPage, () => {
    currentPage.value = 1
})

const isEmptyState = computed(() => {
    return !isLoading.value && discountStore.discounts.length === 0
})

const allSelected = computed(() => {
    return (
        selectedDiscounts.value.length > 0 &&
        selectedDiscounts.value.length === filteredAndSortedDiscounts.value.length
    )
})

// Filtered discounts based on search
const filteredAndSortedDiscounts = computed(() => {
    let filtered = discountStore.discounts.filter((discount) => {
        return discount.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
    })

    // Sort data
    filtered.sort((a, b) => {
        let aVal, bVal

        if (sortColumn.value === 'nama') {
            aVal = a.nama.toLowerCase()
            bVal = b.nama.toLowerCase()
        } else if (sortColumn.value === 'diskon') {
            // Sort by nilai diskon (numeric) - diskon is string from API
            aVal = parseFloat(a.diskon) || 0
            bVal = parseFloat(b.diskon) || 0
        } else if (sortColumn.value === 'createdAt') {
            // For newest first - use createdAt timestamp
            aVal = a.createdAt || 0
            bVal = b.createdAt || 0
        }

        if (sortDirection.value === 'asc') {
            return aVal > bVal ? 1 : -1
        } else {
            return aVal < bVal ? 1 : -1
        }
    })

    return filtered
})

// Pagination
const totalPages = computed(() => {
    return Math.ceil(filteredAndSortedDiscounts.value.length / itemsPerPage.value)
})

const paginatedDiscounts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredAndSortedDiscounts.value.slice(start, end)
})

const visiblePages = computed(() => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(2, currentPage.value - 1)
    let end = Math.min(totalPages.value - 1, currentPage.value + 1)

    if (currentPage.value <= 3) {
        end = Math.min(maxVisible, totalPages.value - 1)
    }

    if (currentPage.value >= totalPages.value - 2) {
        start = Math.max(2, totalPages.value - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages.value) {
            pages.push(i)
        }
    }

    return pages
})

// Sorting function
const sortBy = (column) => {
    // Map display column name to data field name
    const fieldMap = {
        'nama': 'nama',
        'nilai': 'diskon',
        'createdAt': 'createdAt'
    }
    const field = fieldMap[column] || column

    if (sortColumn.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortColumn.value = field
        sortDirection.value = 'asc'
    }
}

// Format discount value
const formatDiscount = (discount) => {
    if (discount.type === '%') {
        return `${discount.diskon}%`
    } else {
        // diskon is string from API, convert to number for formatting
        const value = parseInt(discount.diskon) || 0
        return `Rp ${value.toLocaleString('id-ID')}`
    }
}

// Modal functions
const openAddModal = () => {
    showAddModal.value = true
}

const closeAddModal = () => {
    showAddModal.value = false
}

const openEditModal = (discount) => {
    editingDiscount.value = discount
    showEditModal.value = true
}

const closeEditModal = () => {
    showEditModal.value = false
    editingDiscount.value = null
}

// Handle add discount
const handleAddDiscount = async (formData) => {
    try {
        const dataForAPI = {
            nama: formData.nama,
            diskon: String(formData.diskon),
            type: formData.type,
            outlet: formData.outlet
        }
        const newDiscount = await discountStore.createDiscount(dataForAPI)
        newDiscount.isNew = true
        newDiscount.createdAt = new Date().getTime()
        closeAddModal()
        currentPage.value = 1
        showSuccessMessage(`${formData.nama} berhasil ditambahkan`)
        setTimeout(() => {
            if (newDiscount) {
                newDiscount.isNew = false
            }
        }, 5000)
    } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || 'Network Error'
        showErrorMessage('Gagal menambah diskon: ' + errorMsg)
    }
}

// Handle edit discount
const handleEditDiscount = async (formData) => {
    try {
        await discountStore.updateDiscount(editingDiscount.value._id, formData)
        // Refresh data to ensure UI updates
        await discountStore.fetchDiscounts()
        closeEditModal()
        showSuccessMessage(`${formData.nama} berhasil disimpan`)
    } catch (error) {
        showErrorMessage('Gagal memperbarui diskon: ' + error.message)
    }
}

// Handle delete from modal
const handleDeleteFromModal = (id) => {
    closeEditModal()
    const discountToDeleteItem = discountStore.discounts.find(d => d._id === id)
    if (discountToDeleteItem) {
        deleteConfirmDetails.value = []
        deleteConfirmMessage.value = `Apakah Anda yakin ingin menghapus diskon ${discountToDeleteItem.nama}?`
        discountToDelete.value = id
        isMultipleDelete.value = false
        showDeleteConfirm.value = true
    }
}

// Delete functions
const toggleSelectDiscount = (id) => {
    const index = selectedDiscounts.value.indexOf(id)
    if (index > -1) {
        selectedDiscounts.value.splice(index, 1)
    } else {
        selectedDiscounts.value.push(id)
    }
}

const toggleSelectAll = () => {
    if (allSelected.value) {
        selectedDiscounts.value = []
    } else {
        selectedDiscounts.value = filteredAndSortedDiscounts.value.map(d => d._id)
    }
}

const deleteSelectedDiscounts = () => {
    if (selectedDiscounts.value.length === 0) {
        showErrorMessage('Pilih diskon yang ingin dihapus')
        return
    }

    const discountsToDelete = discountStore.discounts.filter(d =>
        selectedDiscounts.value.includes(d._id)
    )

    deleteConfirmDetails.value = discountsToDelete.map(d => d.nama)
    deleteConfirmMessage.value = `Apakah Anda yakin ingin menghapus diskon yang dipilih?`
    discountToDelete.value = selectedDiscounts.value
    isMultipleDelete.value = true
    showDeleteConfirm.value = true
}

const closeDeleteConfirm = () => {
    showDeleteConfirm.value = false
    deleteConfirmDetails.value = []
    deleteConfirmMessage.value = ''
    discountToDelete.value = null
    isMultipleDelete.value = false
}

const confirmDelete = async () => {
    try {
        if (isMultipleDelete.value) {
            for (const id of discountToDelete.value) {
                await discountStore.deleteDiscount(id)
            }
            const count = discountToDelete.value.length
            showSuccessMessage(`${count} diskon berhasil dihapus`)
        } else {
            const discount = discountStore.discounts.find(d => d._id === discountToDelete.value)
            await discountStore.deleteDiscount(discountToDelete.value)
            showSuccessMessage(`${discount?.nama || 'Diskon'} berhasil dihapus`)
        }
        closeDeleteConfirm()
        selectedDiscounts.value = []
    } catch (error) {
        showErrorMessage('Gagal menghapus diskon: ' + error.message)
    }
}

// Alert functions
const showSuccessMessage = (message) => {
    alertMessage.value = message
    alertType.value = 'success'
    setTimeout(() => {
        alertMessage.value = ''
    }, 3000)
}

const showErrorMessage = (message) => {
    alertMessage.value = message
    alertType.value = 'error'
}

// API Settings functions
const openApiSettings = () => {
    showApiSettings.value = true
}

const closeApiSettings = () => {
    showApiSettings.value = false
}

const handleApiSettingsApply = async (newUrl) => {
    updateApiBaseUrl(newUrl)
    showSuccessMessage('API URL berhasil diperbarui')
    // Reload discounts with new API URL
    isLoading.value = true
    try {
        await discountStore.fetchDiscounts()
    } catch (error) {
        showErrorMessage('Gagal memuat data dari API baru')
    } finally {
        isLoading.value = false
    }
}

// Load discounts on mount
onMounted(async () => {
    try {
        await discountStore.fetchDiscounts()
    } catch (error) {
        showErrorMessage('Gagal memuat data diskon: ' + error.message)
    } finally {
        isLoading.value = false
    }
})
</script>

<style scoped>
.page-container {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Content Card */
.content-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 24px;
    width: 100%;
    max-width: 1128px;
    background: #FFFFFF;
    border-radius: 28px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Header Section */
.header-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
}

.header-actions {
    display: flex;
    gap: 12px;
    align-items: center;
}

.title-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
}

.page-title {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 28px;
    font-weight: 600;
    line-height: 42px;
    color: #212426;
}

.subtitle {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #999;
}

/* Empty State */
.empty-state-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 24px;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 60px 20px;
    text-align: center;
}

.empty-state-icon {
    width: 240px;
    height: 136px;
    margin-bottom: 24px;
    object-fit: contain;
}

.empty-state h2 {
    margin: 0 0 12px 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #212121;
}

.empty-state p {
    margin: 0 0 24px 0;
    color: #666;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    max-width: 300px;
}

/* Filter Action */
.filter-action {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    gap: 8px;
    width: 100%;
    height: 40px;
}

.filter-chip {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px 12px;
    gap: 8px;
    width: auto;
    min-width: 80px;
    height: 40px;
    border: 1px solid #CDD2D5;
    border-radius: 12px;
    cursor: pointer;
    background-color: white;
    transition: all 0.2s ease;
}

.filter-chip:hover {
    background-color: #f5f5f5;
}

.start-icon,
.end-icon {
    flex: none;
    width: 18px;
    height: 18px;
}

.filter-label {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #4B5258;
}

/* Toolbar */
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.toolbar-left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
}

.search-box {
    display: flex;
    align-items: center;
    position: relative;
    min-width: 200px;
}

.search-icon {
    position: absolute;
    left: 12px;
    pointer-events: none;
}

.search-input {
    width: 100%;
    max-width: 250px;
    padding: 10px 16px 10px 40px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.search-input::placeholder {
    color: #999;
}

.search-input:focus {
    outline: none;
    border-color: #3EAE30;
}

/* Table */
.table-container {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    width: 100%;
}

.table-header-secondary {
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.discount-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.discount-table thead {
    background-color: #f5f5f5;
}

.discount-table th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
    color: #212121;
    user-select: none;
}

.sortable {
    cursor: pointer;
    transition: background-color 0.2s;
}

.sortable:hover {
    background-color: #f0f0f0;
}

.th-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.sort-indicator {
    display: flex;
    align-items: center;
    margin-left: auto;
}

.th-content svg {
    flex-shrink: 0;
}

.discount-table thead th.sortable {
    user-select: none;
}

.discount-table td {
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
}

.discount-table tbody tr:hover {
    background-color: #fafafa;
}

.discount-name {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    color: #212121;
}

.badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
}

.badge-new {
    background-color: #ebf6ff;
    color: #219df5;
}

.discount-value {
    color: #666;
}

.table-checkbox {
    cursor: pointer;
    width: 20px;
    height: 20px;
    appearance: none;
    border: 2.5px solid #d0d0d0;
    border-radius: 4px;
    position: relative;
    transition: all 0.2s;
}

.table-checkbox:checked {
    background-color: #3dae2f;
    border-color: #3dae2f;
    border-width: 2.5px;
}

.table-checkbox:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: 700;
}

/* Action Buttons */
.btn-action {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-edit {
    color: #4B5258;
}

.btn-edit:hover {
    background-color: #f1f8f4;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border: none;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary {
    background-color: #3EAE30;
    color: white;
    white-space: nowrap;
}

.btn-primary:hover {
    background-color: #2d8823;
}

.btn-outline {
    background-color: white;
    color: #ff3553;
    border: 1px solid #ff3553;
}

.btn-outline:hover {
    background-color: #fff5f7;
}

/* Pagination */
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-top: 1px solid #e0e0e0;
}

.pagination-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666;
}

.page-size-select {
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    background-color: white;
}

.page-size-select:focus {
    outline: none;
    border-color: #3EAE30;
}

.pagination-text {
    color: #4B5258;
    font-size: 14px;
}

.pagination-controls {
    display: flex;
    gap: 4px;
    align-items: center;
}

.page-btn {
    min-width: 32px;
    height: 32px;
    padding: 4px 8px;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
    background-color: #f5f5f5;
    border-color: #3EAE30;
}

.page-btn.active {
    background-color: #3EAE30;
    color: white;
    border-color: #3EAE30;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Buttons */

.btn-danger {
    background-color: #ff3553;
    color: white;
}

.btn-danger:hover {
    background-color: #e6304a;
}

/* Page Footer */
.page-footer {
    width: 100%;
    text-align: center;
    padding: 16px 0 0 0;
    margin-top: auto;
}

.page-footer p {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 12px;
    color: #999;
}

/* Loading State */
.loading-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.loading-skeleton {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.skeleton-line {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

/* Secondary table */
.secondary-table {
    display: none;
}

/* Responsive */
@media (max-width: 1024px) {
    .toolbar {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }

    .toolbar-left {
        flex-direction: column;
        gap: 8px;
    }

    .filter-chip {
        width: 100%;
    }

    .search-box {
        min-width: unset;
        width: 100%;
    }

    .search-input {
        max-width: 100%;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .content-card {
        padding: 16px;
        gap: 16px;
    }

    .page-title {
        font-size: 24px;
        line-height: 36px;
    }

    .search-input {
        max-width: 100%;
    }

    .toolbar {
        flex-direction: column;
        align-items: stretch;
    }

    .search-box {
        min-width: unset;
    }

    .discount-table {
        font-size: 12px;
    }

    .discount-table th,
    .discount-table td {
        padding: 12px;
    }

    .empty-state-icon {
        width: 160px;
        height: 91px;
    }

    .empty-state {
        padding: 40px 16px;
    }
}
</style>
