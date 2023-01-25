<template>
  <div class="cover container-fluid sticky-top">
    <div class="top row"></div>
    <div class="bottom sticky-top row">
      <div class="col-md-4"></div>
      <div class="col-md-4 d-flex justify-content-center">
        <slot>
          <!-- SECTION  -->
        </slot>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
const artist = computed(() => AppState.artist)
const theme = computed(() => AppState.artist.theme)
</script>


<style lang="scss" scoped>
.cover {
  background-image: url(https://images.unsplash.com/photo-1618556658017-fd9c732d1360?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80);
  background-position: center;
  background-size: cover;
}

.top {
  min-height: 5vh;
}

.bottom {}
</style>
