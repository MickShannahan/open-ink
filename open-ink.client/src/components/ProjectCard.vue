<template>
  <div class="card-wrapper elevation-2 border-theme bg-accent">
    <!-- STUB sharp -->
    <div v-if="theme.card == 'sharp'" :class="`project-card theme-sharp selectable border-theme`" @click="openProject">
      <div class="details d-flex flex-column justify-content-end p-2 text-light">
        <h5>
          {{ project.name }}
        </h5>
        <div>
          <small v-for="t in project.tags"> {{ t }}&ThickSpace;</small>
        </div>
      </div>
    </div>
    <!-- STUB card -->
    <div v-else-if="theme.card == 'card'" :class="`project-card theme-card selectable p-0 border-0  border-theme`"
      @click="openProject">
      <img class="img-fluid" :src="project.coverImg" alt="">
      <div class="details d-flex flex-column justify-content-end p-2 bg-accent text-light">
        <h5>
          {{ project.name }}
        </h5>
        <div>
          <small class="text-theme-accent" v-for="t in project.tags"> {{ t }}&ThickSpace;</small>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { Modal } from 'bootstrap';
import { router } from '../router.js';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
const props = defineProps({ project: { type: Object, required: true } })
const bgImage = computed(() => `url(${props.project.coverImg})`)
const theme = computed(() => AppState.artist.theme)
function openProject() {
  // const modal = Modal.getOrCreateInstance('#project-modal').show()
  router.push({ name: 'Gallery', query: { project: props.project.name } })
}
</script>


<style lang="scss" scoped>
.card-wrapper {
  overflow: hidden;
}

.project-card {
  opacity: 0;
  animation: reveal .2s forwards linear;
  display: grid;
  max-width: 100%;
  object-fit: cover;
  overflow: hidden;
}

.theme-sharp {
  width: 100%;
  aspect-ratio: 1/1;
  background-image: v-bind(bgImage);
  background-size: cover;
  justify-content: start;
  align-items: end;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  .img {
    width: 100%;
    object-fit: cover;
  }

  .details {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    height: 80%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%);
    opacity: 0;
    transition: all .15s linear;

    &:hover {
      opacity: 1;
    }
  }
}

.theme-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  aspect-ratio: 1/1;

  img {
    height: 75%;
    object-fit: cover;
  }

  .details {
    height: 25%;
    display: flex;
  }

  small {
    opacity: .8;
  }
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
