<template>
  <div class="component p-0 my-2" :class="{ nsfw }">
    <ProjectsThread />
    <CreateProjectModal id="create-project" />
    <CreateGalleryModal id="edit-gallery" :galleryData="gallery" />
    <div class="guard" v-if="nsfw"></div>

    <ProjectModal />
  </div>
</template>


<script setup>
import { onMounted, computed, watchEffect, ref, watch, onBeforeMount } from 'vue';
import { AppState } from '../AppState.js';
import { galleriesService } from '../services/GalleriesService.js';
import { matureService } from '../services/MatureService.js'
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import CreateGalleryModal from '../components/CreateGalleryModal.vue';
import CreateProjectModal from '../components/CreateProjectModal.vue';
import ProjectModal from '../components/ProjectModal.vue';
const route = useRoute()
const gallery = computed(() => AppState.activeGallery)
const projects = computed(() => AppState.projects)
const nsfw = ref(false)

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
  if (route.params.gallery) {
    getProjects()
  }
})

watch(gallery, async () => {
  if (gallery.value.nsfw) {
    nsfw.value = true
    let confirm = await matureService.confirmToken()
    if (!confirm) return
  }
  nsfw.value = false
})

</script>


<style lang="scss" scoped>
.component {
  position: relative;
  overflow: visible;
}

.nsfw {
  filter: blur(25px);
}

.guard {
  position: absolute;
  top: 0;
  left: 0;
  height: 110%;
  width: 100%;
}
</style>
