<template>
  <div class="component text-center text-light">
    <img class="profile-img mb-1" :src="artist.picture" alt="">
    <h5 class="text-over-image mb-1"><b>{{ artist.username }}</b></h5>
    <small v-if="artist.bio" class="text-over-image">{{ artist.bio }}&ThickSpace;</small><small v-if="artist.location"
      class="text-over-image"><i class="mdi mdi-map-marker"></i>{{ artist.location }}</small>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
const artist = computed(() => AppState.artist)
const theme = computed(() => AppState.theme)
</script>


<style lang="scss" scoped>
.component {
  position: relative;
}

.profile-img {
  height: 80px;
  width: 80px;
  object-fit: cover;
  border-radius: 1em;
}

small {
  opacity: .75;
  font-size: 13px;
}
</style>
