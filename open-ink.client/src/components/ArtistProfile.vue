<template>
  <div class="component text-center text-light">
    <img class="profile-img" :src="artist.picture" alt="">
    <h5><b>{{ artist.username }}</b></h5>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
const artist = computed(() => AppState.artist)
const theme = computed(() => AppState.theme)
</script>


<style lang="scss" scoped>
.profile-img {
  height: 80px;
  width: 80px;
  object-fit: cover;
  border-radius: 1em;
}
</style>
