<template>
  <div class="container-fluid" v-if="artist.id">
    <!-- SECTION COVER -->
    <section class="row artist-cover">
      <ArtistCover>
        <ArtistProfile />
      </ArtistCover>
    </section>

    <!-- SECTION GALLERIES NAV-->
    <section class="row bg-theme">
      <ArtistGalleries />
    </section>

    <!-- SECTION GALLERY-->
    <section class="row" v-if="activeGallery.id">
      <router-view>
      </router-view>
    </section>

    <!-- SECTION PROJECT MODAL -->
    <ProjectModal v-if="projects.length" />


  </div>
</template>


<script setup>
import { onMounted, computed, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { artistsService } from '../services/ArtistsService.js'
import { galleriesService } from '../services/GalleriesService.js'
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import ProjectModal from '../components/ProjectModal.vue';
import CreateFab from '../components/CreateFab.vue';
const router = useRouter()
const route = useRoute()
onMounted(() => {
  route.params
  getArtist()
  getGalleries()
})
async function getArtist() {
  try {
    await artistsService.getArtist(route.params.artist)
    document.body.classList.add('bg-bg')
  } catch (error) {
    Pop.error(error, 'Get Artist')
  }
}
async function getGalleries() {
  try {
    await galleriesService.getArtistGalleries(route.params.artist)

    if (route.params.gallery) {
      let gallery = AppState.galleries.find(g => g.name == route.params.gallery)
      galleriesService.setActive(gallery)
    }
    else if (AppState.galleries.length) {
      let defaultGallery = AppState.galleries[0]
      galleriesService.setActive(defaultGallery)
      router.push({ name: 'Gallery', params: { gallery: defaultGallery.name } })
    }
  } catch (error) {
    Pop.error(error, 'Get Galleries')
  }
}
const artist = computed(() => AppState.artist)
const theme = computed(() => AppState.artist?.theme)
const activeGallery = computed(() => AppState.activeGallery)
const projects = computed(() => AppState.projects)
const account = computed(() => AppState.account)
// themes
const bgColor = computed(() => theme.primaryColor)
</script>


<style lang="scss" scoped>
.artist-cover {}

.bg-theme {
  background-color: v-bind(bgColor);
}

.scroll-test {
  min-height: 200vh;
}
</style>
