<template>

</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
const router = useRouter()
const route = useRoute()

onMounted(() => {
  router.push({ name: 'Account', query: { invite: route.params.code } })
})

</script>


<style lang="scss" scoped>

</style>
