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
    <section class="slow-reveal d-flex align-items-center" v-else>
      nothing to see here.
    </section>

    <CreateGalleryModal id="create-gallery" />


  </div>
</template>


<script setup>
import { onMounted, computed, watchEffect, watch } from 'vue';
import Pop from '../utils/Pop.js';
import { artistsService } from '../services/ArtistsService.js'
import { galleriesService } from '../services/GalleriesService.js'
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import CreateGalleryModal from '../components/CreateGalleryModal.vue';
import { projectsService } from '../services/ProjectsService.js';
import { logger } from '../utils/Logger.js';
const router = useRouter()
const route = useRoute()
onMounted(() => {
  route.params
  getArtist()
  getGalleries()
})
watchEffect(() => {
  document.title = route.params.artist
})
async function getArtist() {
  try {
    await artistsService.getArtist(route.params.artist)
    document.querySelector('#app').classList.add('bg-bg')
  } catch (error) {
    Pop.error(error, 'Get Artist')
  }
}
async function getGalleries() {
  try {
    logger.log('AP- getGalleris', route.params.gallery)
    await galleriesService.getArtistGalleries(route.params.artist)
    let gallery = AppState.galleries.find(g => g.name == route.params.gallery)

    if (gallery) {
      galleriesService.setActive(gallery)
    }
    else if (AppState.galleries.length) {
      gallery = AppState.galleries[0]
      galleriesService.setActive(gallery)
      router.push({ name: 'Gallery', params: { gallery: gallery.name } })
    }
  } catch (error) {
    Pop.error(error, 'Get Galleries')
  }
}
const artist = computed(() => AppState.artist)
const theme = computed(() => AppState.artist?.theme)
const activeGallery = computed(() => AppState.activeGallery)
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
