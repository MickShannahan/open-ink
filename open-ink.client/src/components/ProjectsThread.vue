<template>
  <div :class="`layout-${theme?.layout}`">
    <ProjectCard v-for="p in projects" :project="p" />
  </div>
</template>


<script setup>
import { AppState } from '../AppState.js';
import { computed } from 'vue'

const theme = computed(() => AppState.artist.theme)
const projects = computed(() => AppState.projects)
const gap = computed(() => theme?.value.gap + 'px')
const columnsCount = computed(() => `${theme.value?.columns} minmax(200px, 1fr)`)
const gridColumns = computed(() => `repeat(${theme.value?.columns}, minmax(200px, 1fr)`)
const padding = computed(() => `${0}px ${theme?.value.gutter}px`)
</script>


<style lang="scss">
.create-project {
  border: 1px solid;
  aspect-ratio: 1/1;
}

.layout- {

  &squares {
    padding: v-bind(padding);
    display: grid;
    grid-template-columns: v-bind(gridColumns);
    gap: v-bind(gap);
    grid-auto-flow: row;
  }

  &columns {
    columns: v-bind(columnsCount);
    column-gap: v-bind(gap);
  }

  .card-wrapper {
    max-width: 100%;
  }
}
</style>
