<template>
  <div class="d-flex project-thread">
    <h4 class=" text-theme-secondary m-1 mb-3">{{ gallery.name }}</h4>
    <button v-if="account.id == gallery.ownerId" class="btn ui-border text-theme-accent selectable h-50 rounded-pill"
      title="delete Gallery" @click="removeGallery"><i class="mdi mdi-delete-forever"></i></button>
  </div>
  <div class=" project-thread"
    :class="{ 'layout-squares': theme.layout == 'squares', 'layout-columns': theme.layout == 'columns' }">
    <ProjectCard v-for="p in projects" :project="p" />
  </div>
</template>


<script setup>
import { AppState } from '../AppState.js';
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
.create-project {
  border: 1px solid;
  aspect-ratio: 1/1;
}

.project-thread {
  padding: v-bind(padding);
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
