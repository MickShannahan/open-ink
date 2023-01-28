<template>
  <section class="d-flex justify-content-between">
    <h5>
      {{ account.username }}
    </h5>
    <!-- LOGIN COMPONENT HERE -->
    <Login />
  </section>
</template>

<script setup>
import { AppState } from '../AppState.js';
import { computed } from 'vue'
const account = computed(() => AppState.account)
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-primary);
  color: var(--bs-primary);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
