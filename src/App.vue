<script setup>
import { useRouter } from 'vue-router'
import './assets/main.css'

const router = useRouter()
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
}
</style>
