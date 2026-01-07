<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>{{ isEdit ? 'Ubah Diskon' : 'Tambah Diskon' }}</h2>
                <button class="close-btn" @click="closeModal">✕</button>
            </div>

            <form @submit.prevent="handleSubmit" class="modal-body">
                <!-- Nama Diskon Field -->
                <div class="form-group">
                    <div class="input-wrapper" :class="{ error: errors.nama }">
                        <label class="floating-label" for="nama">Nama Diskon</label>
                        <input id="nama" v-model="form.nama" type="text"
                            placeholder="Misal: Diskon opening, diskon akhir tahun" class="form-input"
                            @blur="validateNama" />
                        <span v-if="errors.nama" class="error-indicator" aria-hidden="true">!</span>
                    </div>
                    <span v-if="errors.nama" class="error-message">{{ errors.nama }}</span>
                </div>

                <!-- Diskon Field -->
                <div class="form-group">
                    <div class="diskon-group">
                        <div class="input-wrapper amount-wrapper"
                            :class="{ error: errors.diskon, 'has-prefix': form.type === 'Rp', 'has-suffix': form.type === '%' }">
                            <label class="floating-label" for="diskon">Diskon</label>
                            <span v-if="form.type === 'Rp'" class="prefix">Rp</span>
                            <input id="diskon" v-model.lazy="form.diskon" type="text" placeholder="0"
                                class="form-input amount-field" @blur="validateDiskon"
                                @input="form.diskon = formatDiskonInput($event.target.value)" />
                            <span v-if="form.type === '%'" class="suffix">%</span>
                        </div>

                        <div class="type-selector" role="group" aria-label="Jenis diskon">
                            <button type="button" class="type-btn" :class="{ active: form.type === '%' }"
                                @click="form.type = '%'">
                                <span v-if="form.type === '%'" class="type-check">✓</span>
                                %
                            </button>
                            <button type="button" class="type-btn" :class="{ active: form.type === 'Rp' }"
                                @click="form.type = 'Rp'">
                                <span v-if="form.type === 'Rp'" class="type-check">✓</span>
                                Rp
                            </button>
                        </div>
                    </div>
                    <span v-if="errors.diskon" class="error-message">{{ errors.diskon }}</span>
                </div>

                <!-- Action Buttons -->
                <div class="modal-actions" :class="{ 'edit-mode': isEdit }">
                    <button v-if="isEdit" type="button" class="btn-delete-text" @click="handleDelete">
                        Hapus
                    </button>
                    <button type="submit" class="btn btn-primary" :class="{ 'btn-not-full': isEdit }">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDiscountStore } from '../stores/discountStore'

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    initialData: {
        type: Object,
        default: null
    },
    isEdit: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'submit', 'delete'])
const discountStore = useDiscountStore()

const form = ref({
    nama: '',
    diskon: '',
    type: '%',
    outlet: 'Kopi Anak Bangsa'
})

const errors = ref({
    nama: '',
    diskon: ''
})

// Load initial data when editing
watch(() => props.initialData, (newData) => {
    if (newData && props.isEdit) {
        form.value = {
            nama: newData.nama || '',
            diskon: newData.type === 'Rp' ? formatDiskonInput(newData.diskon) : newData.diskon,
            type: newData.type || '%',
            outlet: newData.outlet || 'Kopi Anak Bangsa'
        }
        errors.value = { nama: '', diskon: '' }
    }
}, { deep: true, immediate: true })

// Reset form when modal closes
watch(() => props.isOpen, (newVal) => {
    if (!newVal) {
        form.value = {
            nama: '',
            diskon: '',
            type: '%',
            outlet: 'Kopi Anak Bangsa'
        }
        errors.value = { nama: '', diskon: '' }
    } else if (newVal && !props.isEdit) {
        form.value = {
            nama: '',
            diskon: '',
            type: '%',
            outlet: 'Kopi Anak Bangsa'
        }
        errors.value = { nama: '', diskon: '' }
    }
})

const validateNama = () => {
    const namaValue = form.value.nama.trim()

    if (!namaValue) {
        errors.value.nama = 'Nama diskon tidak boleh kosong.'
        return false
    }

    const isDuplicate = discountStore.discounts?.some(discount => {
        if (props.isEdit && discount._id === props.initialData?._id) {
            return false
        }
        return discount.nama.toLowerCase() === namaValue.toLowerCase()
    })

    if (isDuplicate) {
        errors.value.nama = 'Nama diskon sudah digunakan.'
        return false
    }

    errors.value.nama = ''
    return true
}

const formatDiskonInput = (value) => {
    // Handle both Rp and % types, but only format Rp
    const digits = String(value).replace(/\D/g, '')
    if (form.value.type === 'Rp' || (props.isEdit && props.initialData?.type === 'Rp')) {
        // Format with thousands separator
        return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
    return value
}

const validateDiskon = () => {
    const diskonValue = form.value.diskon

    if (diskonValue === '' || diskonValue === null || diskonValue === undefined) {
        errors.value.diskon = 'Diskon tidak boleh kosong.'
        return false
    }

    if (Number(String(diskonValue).replace(/\D/g, '')) <= 0) {
        errors.value.diskon = 'Diskon harus lebih dari 0.'
        return false
    }

    errors.value.diskon = ''
    return true
}

const handleSubmit = () => {
    const isNamaValid = validateNama()
    const isDiskonValid = validateDiskon()

    if (isNamaValid && isDiskonValid) {
        emit('submit', {
            nama: form.value.nama.trim(),
            diskon: Number(String(form.value.diskon).replace(/\D/g, '')),
            type: form.value.type,
            outlet: form.value.outlet
        })
        form.value = {
            nama: '',
            diskon: '',
            type: '%',
            outlet: 'Kopi Anak Bangsa'
        }
        errors.value = { nama: '', diskon: '' }
    }
}

const closeModal = () => {
    emit('close')
}

const handleDelete = () => {
    if (props.isEdit && props.initialData) {
        emit('delete', props.initialData._id)
    }
}
</script>

<style scoped>
.modal-overlay {
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

.modal-content {
    background: white;
    border-radius: 16px;
    max-width: 480px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 16px 24px;
}

.modal-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #212121;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.close-btn:hover {
    background-color: #f5f5f5;
}

.modal-body {
    padding: 16px 24px 24px 24px;
}

.form-group {
    margin-bottom: 16px;
}

/* Floating label inside the input border */
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
}

.form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s;
}

.form-input:focus {
    outline: none;
    border-color: #3EAE30;
}

.input-wrapper.error .form-input {
    border-color: #ff3553;
}

.error-indicator {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #ff3553;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
}

.error-message {
    display: block;
    color: #ff3553;
    font-size: 12px;
    margin-top: 4px;
}

.amount-wrapper.has-prefix .amount-field {
    padding-left: 40px;
}

.amount-wrapper.has-suffix .amount-field {
    padding-right: 34px;
}

.prefix,
.suffix {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #6b6b6b;
    font-weight: 600;
}

.prefix {
    left: 12px;
}

.suffix {
    right: 12px;
}

.diskon-group {
    display: flex;
    gap: 12px;
    align-items: flex-start;
}

.amount-wrapper {
    flex: 1;
}

.type-selector {
    display: flex;
    gap: 0;
    border: 1px solid #d0d0d0;
    border-radius: 20px;
    overflow: hidden;
}

.type-btn {
    padding: 10px 16px;
    border: none;
    background: white;
    border-radius: 0;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.type-btn:not(:last-child) {
    border-right: 1px solid #d0d0d0;
}

.type-btn.active {
    background-color: #f0fbef;
    /* requested background */
    color: #2e7d32;
}

.type-btn:hover:not(.active) {
    background-color: #fafafa;
}

.type-check {
    color: #3EAE30;
    font-weight: 700;
}

.btn-delete-text {
    background: none;
    border: none;
    color: #ff3553;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s;
}

.btn-delete-text:hover {
    opacity: 0.8;
}

.modal-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    align-items: center;
    margin-top: 24px;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary {
    background-color: #3dae2f;
    /* requested button color */
    color: white;
    width: 100%;
}

.btn-primary.btn-not-full {
    width: auto;
    min-width: 120px;
}

.modal-actions.edit-mode {
    justify-content: space-between;
}

.btn-primary:hover {
    background-color: #37a62c;
}

.btn-primary:active {
    opacity: 0.9;
}
</style>
