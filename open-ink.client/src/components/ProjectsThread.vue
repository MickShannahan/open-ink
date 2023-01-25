<template>
  <div :class="`layout-${theme?.layout}`" :style="`padding: ${0}px ${theme.gutter}px`">
    <ProjectCard v-for="p in projects" :project="p" />
  </div>
</template>


<script setup>
import { AppState } from '../AppState.js';
import { computed } from 'vue'

const projects = computed(() => AppState.projects)
const theme = computed(() => AppState.artist.theme)
const gap = computed(() => AppState.theme?.gap + 'px')
const columns = computed(() => `repeat(5, minmax(0, 1fr)`)
</script>


<style lang="scss" scoped>
.create-project {
  border: 1px solid;
  aspect-ratio: 1/1;
}

.layout- {
  &squares {
    display: grid;
    grid-template-columns: v-bind(columns);
    gap: v-bind(gap);
  }
}
</style>
