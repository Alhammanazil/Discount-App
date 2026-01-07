<template>
    <transition name="alert-fade">
        <div v-if="isVisible" class="alert" :class="alertClass">
            {{ message }}
        </div>
    </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'success',
        validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    message: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 3000
    }
})

const isVisible = ref(false)

watch(() => props.message, (newMessage) => {
    if (newMessage) {
        isVisible.value = true
        if (props.duration > 0) {
            setTimeout(() => {
                isVisible.value = false
            }, props.duration)
        }
    }
})

const alertClass = {
    'alert-success': props.type === 'success',
    'alert-error': props.type === 'error',
    'alert-warning': props.type === 'warning',
    'alert-info': props.type === 'info'
}
</script>

<style scoped>
.alert {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 400px;
    padding: 16px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.alert-success {
    background-color: #046b5f;
    color: white;
}

.alert-error {
    background-color: #ff3553;
    color: white;
}

.alert-warning {
    background-color: #ffc107;
    color: #212121;
}

.alert-info {
    background-color: #03a9f4;
    color: white;
}

.alert-fade-enter-active,
.alert-fade-leave-active {
    transition: opacity 0.3s ease;
}

.alert-fade-enter-from,
.alert-fade-leave-to {
    opacity: 0;
}
</style>
