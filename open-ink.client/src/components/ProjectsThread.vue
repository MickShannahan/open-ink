<template>
  <div class="d-flex project-thread">
    <h4 class=" text-theme-secondary m-1 mb-3">{{ gallery.name }}</h4>
    <button v-if="isArtist" class=" p-1 px-4 ms-2 ui-border text-theme-secondary selectable h-50 rounded-pill"
      title="edit Gallery" data-bs-toggle="modal" data-bs-target="#edit-gallery"><i class="mdi mdi-pen"></i></button>
    <button v-if="isArtist" class=" p-1 px-4 ms-2 ui-border text-theme-secondary selectable h-50 rounded-pill"
      title="delete Gallery" @click="removeGallery"><i class="mdi mdi-delete-forever"></i></button>
  </div>
  <div v-if="projects.length" class=" project-thread"
    :class="{ 'layout-squares': theme.layout == 'squares', 'layout-columns': theme.layout == 'columns' }">
    <ProjectCard v-for="p in projects" :project="p" />
    <button v-if="isArtist" class="add-project p-3" data-bs-target="#create-project" data-bs-toggle="modal">
      <div class="ui-border d-flex justify-content-center h-100 text-theme-secondary selectable align-items-center">
        Add project
        <i class="mdi mdi-plus"></i>
      </div>
    </button>
  </div>
  <div v-else class=" project-thread text-center p-5">
    <div>
      <h6 class="text-theme-color">no projects to show yet</h6>
      <button v-if="isArtist" class="selectable text-theme-secondary rounded-pill p-2 px-3"
        data-bs-target="#create-project" data-bs-toggle="modal">create one <i class="mdi mdi-plus"></i></button>
    </div>
    <img class="placeholder-svg text-theme-secondary" src="/src/assets/img/unDraw/undraw_making_art_re_ee8w.svg" alt="">
  </div>
</template>


<script setup>
import { AppState, isArtist } from '../AppState.js';
import { computed } from 'vue'
import Pop from '../utils/Pop.js';
import { galleriesService } from '../services/GalleriesService.js';
import { router } from '../router.js';
import { useRoute } from 'vue-router';
const route = useRoute()
const theme = computed(() => AppState.artist.theme)
const gallery = computed(() => AppState.activeGallery)
const account = computed(() => AppState.account)
const projects = computed(() => AppState.projects)
const gap = computed(() => theme?.value.gap + 'px')
const columns = computed(() => `${theme.value?.columns}px`)
const gridColumns = computed(() => `repeat(auto-fill, minmax(${theme.value?.columns}px, 1fr)`)
const padding = computed(() => `${0}px ${theme?.value.gutter}%`)


async function removeGallery() {
  try {
    if (await Pop.confirm(`Remove ${gallery.value.name}?`, 'this is irreversible.', 'Remove it', 'question')) {
      await galleriesService.removeGallery(gallery.value.id)
      router.push({ name: 'Artist', params: { artist: route.params.artist } })
    }
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<style lang="scss">
.placeholder-svg {
  width: 20%;
  opacity: .7;
  filter: grayscale(.2) invert(1) drop-shadow(1px 0px 0px rgba(255, 255, 255, 0.164));
}

.create-project {
  border: 1px solid;
  aspect-ratio: 1/1;
}

.project-thread {
  padding: v-bind(padding);
  transition: all .1s ease;

  .add-project {
    width: 100%;
    aspect-ratio: 1/1;
  }
}

.layout-squares {
  display: grid;
  grid-template-columns: v-bind(gridColumns);
  gap: v-bind(gap);
  grid-auto-flow: row;

  .card-wrapper {
    max-width: 100%;

    .project-card {
      aspect-ratio: 1/1;

      img {
        display: none;
      }
    }
  }
}

.layout-columns {
  columns: v-bind(columns);
  column-gap: v-bind(gap);

  .card-wrapper {
    margin-bottom: v-bind(gap);

    .project-card {


      img {
        height: 100%;
      }
    }
  }
}
</style>
