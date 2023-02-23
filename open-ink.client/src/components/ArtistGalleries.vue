<template>
  <div v-if="galleries.length" class="d-flex px-0 bg-accent elevation-2 ">
    <router-link v-for="g in galleries" :to="{ name: 'Gallery', params: { gallery: g.name } }" class="mb-0">
      <button class="btn rounded-0 selectable px-3">
        {{ g.name }}<span v-if="!g.published" v-tooltip:auto="`not published`"><i class="mdi mdi-eye-off"></i></span>
      </button>
    </router-link>
    <button v-if="isArtist" class="btn rounded-0 selectable px-3 " data-bs-toggle="modal" data-bs-target="#create-gallery"
      v-tooltip:auto="`create new gallery`"><i class="mdi mdi-plus"></i></button>
    <button v-if="isArtist" class="btn rounded-0 selectable px-3 tool-button" @click="toggleEdit"
      v-tooltip:left="'toggle gallery tools'">Gallery Tools
      <i class="mdi mdi-tools"></i></button>
  </div>
  <div v-else-if="isArtist && galleries.length < 1" class="d-flex px-0 bg-accent elevation-2 justify-content-between">
    <button class="btn rounded-0 selectable px-3 " data-bs-toggle="modal" data-bs-target="#create-gallery">Create A
      Gallery <i class="mdi mdi-plus"></i></button>
  </div>
  <div v-else class="d-flex px-0 bg-accent elevation-2 justify-content-end">
    <button class="rounded-0 btn px-3">
      <i class="mdi mdi-circle"></i>x<i class="mdi mdi-circle"></i>
    </button>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router';
import { AppState, isArtist } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
const route = useRoute()
const artist = computed(() => AppState.artist)
const theme = computed(() => AppState.artist.theme)
const galleries = computed(() => AppState.galleries)
const routeName = computed(() => route.params.gallery)

function toggleEdit() {
  AppState.editing.gallery = !AppState.editing.gallery
  logger.log(AppState.editing.gallery)
}
</script>


<style lang="scss" scoped>
a {
  transition: all .15s ease;
  margin-bottom: 2px;
}

.tool-button {
  margin-left: auto;
}

// .router-link-exact-active {
//   margin-bottom: 0px;
//   border-bottom: 2px solid $theme-primary;
//   border-bottom-left-radius: 0;
//   border-bottom-right-radius: 0;
// }
</style>
