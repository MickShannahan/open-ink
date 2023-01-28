<template>
  <div class="project-card selectable" @click="openProject">
    {{ project.name }}
  </div>
</template>


<script setup>
import { Modal } from 'bootstrap';
import { router } from '../router.js';
import { computed } from 'vue';
const props = defineProps({ project: { type: Object, required: true } })
const bgImage = computed(() => `url(${props.project.coverImg})`)
function openProject() {
  // const modal = Modal.getOrCreateInstance('#project-modal').show()
  router.push({ name: 'Gallery', query: { project: props.project.name } })
}
</script>


<style lang="scss" scoped>
.project-card {
  border: 1px solid;
  aspect-ratio: 1/1;
  background-image: v-bind(bgImage);
  background-size: cover;
  opacity: 0;
  animation: reveal .2s forwards linear;
}

@keyframes reveal {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
