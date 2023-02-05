<template>
  <div class="project-card selectable">
    <router-link :to="{ params: { gallery: projectGallery.name }, query: { project: project.name } }" class="img-fit">
      <!-- <BImage :image="bi" v-if="project.coverBlur" /> -->
      <img :class="{ 'nsfw-small': project.nsfw && !activeProject.nsfw && !ageToken() }" :src="project.coverImg" alt="">
    </router-link>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, defineProps } from 'vue';
import { matureService } from '../services/MatureService.js';
const props = defineProps({ project: { type: Object } })
const projectGallery = computed(() => AppState.galleries.find(g => g.id == props.project.galleryId))
const activeProject = computed(() => AppState.activeProject)
function ageToken() {
  return matureService.getToken()
}
</script>


<style lang="scss" scoped>
.project-card {
  padding: 0;
  width: 33%;
  aspect-ratio: 1/1;
  overflow: hidden;
}

.img-fit {

  img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
}
</style>
