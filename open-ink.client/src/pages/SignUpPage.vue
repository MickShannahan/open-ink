<template></template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
const router = useRouter()
const route = useRoute()

onMounted(() => {
  logger.log('route', route.query, route)
  router.push({ name: 'Account', query: { invite: route.params.code } })
})

</script>


<style lang="scss" scoped></style>
