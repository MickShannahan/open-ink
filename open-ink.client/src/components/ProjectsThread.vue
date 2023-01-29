<template>
  <h4 class="project-thread text-theme-secondary m-1 mb-3">{{ gallery.name }}</h4>
  <div class="project-thread"
    :class="{ 'layout-squares': theme.layout == 'squares', 'layout-columns': theme.layout == 'columns' }">
    <ProjectCard v-for="p in projects" :project="p" />
  </div>
</template>


<script setup>
import { AppState } from '../AppState.js';
import { computed } from 'vue'

const theme = computed(() => AppState.artist.theme)
const gallery = computed(() => AppState.activeGallery)
const projects = computed(() => AppState.projects)
const gap = computed(() => theme?.value.gap + 'px')
const columnsCount = computed(() => `${theme.value?.columns} 200px`)
const gridColumns = computed(() => `repeat(${theme.value?.columns}, minmax(200px, 1fr)`)
const padding = computed(() => `${0}px ${theme?.value.gutter}vw`)
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
  columns: v-bind(columnsCount);
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
