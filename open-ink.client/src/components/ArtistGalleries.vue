<template>
  <div class="d-flex px-0 bg-accent elevation-2 ">
    <router-link v-for="g in galleries" :to="{ name: 'Gallery', params: { gallery: g.name } }" class="mb-0">
      <button class="btn rounded-0 selectable px-3">
        {{ g.name }}
      </button>
    </router-link>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
const route = useRoute()
const artist = computed(() => AppState.artist)
const theme = computed(() => AppState.artist.theme)
const galleries = computed(() => AppState.galleries)
const routeName = computed(() => route.params.gallery)
</script>


<style lang="scss" scoped>
a {
  transition: all .15s ease;
  margin-bottom: 2px;
}

// .router-link-exact-active {
//   margin-bottom: 0px;
//   border-bottom: 2px solid $theme-primary;
//   border-bottom-left-radius: 0;
//   border-bottom-right-radius: 0;
// }
</style>
