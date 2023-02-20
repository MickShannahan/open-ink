<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <Login />
  </div>
</template>

<script setup>
import { watch, computed } from 'vue';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
const userLoggedIn = computed(() => AppState.user.isAuthenticated)

watch(userLoggedIn, () => {
  router.push({ name: 'Account' })
})

</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
