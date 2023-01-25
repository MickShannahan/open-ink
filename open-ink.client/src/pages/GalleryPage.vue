<template>
  <div class="component p-0 my-2">
    <h4 class="ps-2">{{ gallery.name }}</h4>
    <ProjectsThread />
  </div>
</template>


<script setup>
import { onMounted, computed, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { galleriesService } from '../services/GalleriesService.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
const route = useRoute()
const gallery = computed(() => AppState.activeGallery)
const projects = computed(() => AppState.projects)

async function getProjects() {
  try {
    let gallery = AppState.galleries.find(g => g.name == route.params.gallery)
    galleriesService.setActive(gallery)
    await galleriesService.getGalleryProjects(route.params.artist, gallery.id)
  } catch (error) {
    Pop.error(error)
  }
}
watchEffect(() => {
  logger.log('gallery watch')
  route.params.gallery
  getProjects()
})

</script>


<style lang="scss" scoped>

</style>
