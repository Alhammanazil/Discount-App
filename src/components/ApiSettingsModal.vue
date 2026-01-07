<template>
    <div v-if="isOpen" class="settings-overlay" @click.self="closeSettings">
        <div class="settings-dropdown">
            <div class="dropdown-header">
                <div class="header-with-icon">
                    <svg class="outlet-icon" width="24" height="24" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.71 6.285L15.2314 4.035C15.0145 3 14.0873 2.25 13.0404 2.25H4.97194C3.91758 2.25 2.99782 3 2.77349 4.035L2.30239 6.285C2.16032 6.9525 2.32483 7.635 2.75106 8.1675C3.02026 8.4975 3.37919 8.73 3.76803 8.865V13.5C3.76803 14.7375 4.77752 15.75 6.01135 15.75H11.9935C13.2274 15.75 14.2369 14.7375 14.2369 13.5V8.865C14.6332 8.73 14.9846 8.4975 15.2538 8.1675C15.6801 7.635 15.8446 6.9525 15.7025 6.285H15.71ZM7.95556 3.75H10.0568L10.2662 6.6975C10.2811 6.9075 10.2138 7.11 10.0643 7.26C9.9222 7.4175 9.72778 7.5 9.5184 7.5H8.49396C8.28458 7.5 8.09016 7.4175 7.94808 7.26C7.806 7.1025 7.73123 6.9075 7.74618 6.6975L7.95556 3.75ZM4.23913 4.3425C4.3139 3.9975 4.62049 3.75 4.97194 3.75H6.45254L6.25064 6.5925L6.23568 6.8025C6.20577 7.1925 5.87675 7.5 5.48791 7.5H4.49337C4.26904 7.5 4.05218 7.395 3.91011 7.2225C3.76803 7.0425 3.71569 6.8175 3.76055 6.5925L4.23913 4.3425ZM8.25467 14.25V12.75C8.25467 12.3375 8.59117 12 9.00244 12C9.41372 12 9.75021 12.3375 9.75021 12.75V14.25H8.25467ZM11.9935 14.25H11.2458V12.75C11.2458 11.5125 10.2363 10.5 9.00244 10.5C7.76862 10.5 6.75912 11.5125 6.75912 12.75V14.25H6.01135C5.60007 14.25 5.26358 13.9125 5.26358 13.5V9H5.48791C6.06369 9 6.59461 8.775 6.99093 8.415C7.40221 8.7825 7.93313 9 8.48648 9H9.51093C10.0643 9 10.5952 8.7825 11.0065 8.415C11.4103 8.7825 11.9337 9 12.5095 9H12.7338V13.5C12.7338 13.9125 12.3973 14.25 11.9861 14.25H11.9935ZM14.0948 7.2225C13.9527 7.4025 13.7433 7.5 13.5115 7.5H12.517C12.1281 7.5 11.7991 7.1925 11.7692 6.8025L11.7542 6.5925L11.5523 3.75H13.0329C13.3844 3.75 13.691 3.9975 13.7658 4.3425L14.2443 6.5925C14.2892 6.8175 14.2369 7.0425 14.0948 7.2225Z"
                            fill="#4B5258" />
                    </svg>
                    <h2>Kopi Anak Bangsa</h2>
                </div>
                <svg class="chevron-icon" :class="{ rotated: isOpen }" width="18" height="18" viewBox="0 0 18 18"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 7.5L9 12L13.5 7.5" stroke="#4B5258" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>

            <div class="dropdown-content">
                <div class="form-group">
                    <div class="input-wrapper">
                        <label class="floating-label" for="apiUrl">API URL crudcrud.com</label>
                        <input id="apiUrl" v-model="apiUrl" type="text"
                            placeholder="https://crudcrud.com/api/.../diskon" class="form-input" />
                    </div>
                </div>

                <button @click="applySettings" class="btn btn-primary">Terapkan</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'apply'])

const apiUrl = ref('')

// Load saved API URL from localStorage
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        const savedUrl = localStorage.getItem('apiBaseUrl')
        if (savedUrl) {
            apiUrl.value = savedUrl
        } else {
            // Default value from .env (but we won't rely on it)
            apiUrl.value = import.meta.env.VITE_API_BASE_URL || ''
        }
    }
})

const closeSettings = () => {
    emit('close')
}

const applySettings = () => {
    if (apiUrl.value.trim()) {
        localStorage.setItem('apiBaseUrl', apiUrl.value.trim())
        emit('apply', apiUrl.value.trim())
        closeSettings()
    }
}
</script>

<style scoped>
.settings-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.settings-dropdown {
    background: white;
    border-radius: 16px;
    max-width: 520px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.dropdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
}

.header-with-icon {
    display: flex;
    align-items: center;
    gap: 12px;
}

.outlet-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

.dropdown-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #212121;
}

.chevron-icon {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
}

.chevron-icon.rotated {
    transform: rotate(180deg);
}

.dropdown-content {
    padding: 24px;
}

.form-group {
    margin-bottom: 20px;
}

/* Floating label matching DiscountModal style */
.input-wrapper {
    position: relative;
}

.floating-label {
    position: absolute;
    top: -10px;
    left: 12px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 500;
    color: #7a7a7a;
    background: #fff;
    z-index: 1;
}

.form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s;
    box-sizing: border-box;
}

.form-input:focus {
    outline: none;
    border-color: #3EAE30;
}

.form-input::placeholder {
    color: #999;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
}

.btn-primary {
    background-color: #3dae2f;
    color: white;
}

.btn-primary:hover {
    background-color: #37a62c;
}

.btn-primary:active {
    opacity: 0.9;
}
</style>
