<template>
  <div class="project-card selectable" @click="openProject">
    {{ project.name }}
  </div>
</template>


<script setup>
import { Modal } from 'bootstrap';
import { router } from '../router.js';
const props = defineProps({ project: { type: Object, required: true } })
function openProject() {
  // const modal = Modal.getOrCreateInstance('#project-modal').show()
  router.push({ name: 'Gallery', query: { project: props.project.name } })
}
</script>


<style lang="scss" scoped>
.project-card {
  border: 1px solid;
  aspect-ratio: 1/1;
}
</style>
