<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>{{ title }}</h2>
            </div>

            <div class="modal-body">
                <p>{{ message }}</p>
                <p v-if="showWarning" class="warning-text">• Diskon yang dihapus tidak bisa dikembalikan lagi.</p>
            </div>

            <div class="modal-actions">
                <button class="btn btn-secondary" @click="closeModal">
                    {{ cancelText }}
                </button>
                <button class="btn btn-danger" @click="confirm">
                    {{ confirmText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: 'Konfirmasi'
    },
    message: {
        type: String,
        default: 'Apakah Anda yakin?'
    },
    details: {
        type: Array,
        default: () => []
    },
    confirmText: {
        type: String,
        default: 'Hapus'
    },
    cancelText: {
        type: String,
        default: 'Batalkan'
    },
    showWarning: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['close', 'confirm'])

const closeModal = () => {
    emit('close')
}

const confirm = () => {
    emit('confirm')
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
    max-width: 520px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.modal-header {
    padding: 24px 24px 16px 24px;
}

.modal-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #212121;
}

.modal-body {
    padding: 0 24px 24px 24px;
}

.modal-body p {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #212121;
    line-height: 1.5;
}

.warning-text {
    margin: 12px 0 0 0;
    font-size: 14px;
    color: #212121;
    line-height: 1.5;
}

.modal-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding: 0 24px 24px 24px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    flex: 0 0 auto;
    min-width: 120px;
}

.btn-secondary {
    background-color: transparent;
    color: #ff3553;
    border: 2px solid #ff3553;
}

.btn-secondary:hover {
    background-color: #fff5f7;
}

.btn-danger {
    background-color: #ff3553;
    color: white;
}

.btn-danger:hover {
    background-color: #e6304a;
}
</style>
