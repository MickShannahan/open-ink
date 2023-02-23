<template>
  <div class="card-wrapper elevation-2 border-theme bg-accent">
    <!-- STUB sharp -->
    <div v-if="theme.card == 'sharp'" :class="`project-card theme-sharp selectable border-theme`" @click="openProject">
      <div v-if="!project.published" class="published-eye text-center w-100 text-over-image text-light">not published <i
          class="mdi mdi-eye-off"></i></div>
      <img class="img-fluid" :src="project.coverImg" alt="">
      <div class="details d-flex flex-column justify-content-end p-2 text-light">
        <h5 class="mb-1">
          {{ project.name }} <span class="published-eye" v-if="project.nsfw" v-tooltip:auto="`mature`"><i
              class="mdi mdi-fire"></i></span>
        </h5>
        <div>
          <small>{{ formatDate(project.createdAt) }}</small>
        </div>
      </div>
    </div>
    <!-- STUB card -->
    <div v-else-if="theme.card == 'card'" :class="`project-card theme-card selectable p-0 border-0  border-theme`"
      @click="openProject">
      <img class="img-fluid" :src="project.coverImg" alt="">
      <div class="details d-flex flex-column justify-content-end p-2 bg-accent text-light">
        <h5>
          {{ project.name }}<span class="nsfw-tag" v-if="project.nsfw"><i class="mdi mdi-close"></i><i
              class="mdi mdi-close"></i><i class="mdi mdi-close"></i></span>
        </h5>
        <div class="text-theme-accent">
          <small>{{ formatDate(project.createdAt) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { Modal } from 'bootstrap';
import { router } from '../router.js';
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { matureService } from '../services/MatureService.js';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js';
const props = defineProps({ project: { type: Object, required: true } })
const bgImage = computed(() => `url(${props.project.coverImg})`)
const theme = computed(() => AppState.artist.theme)

async function openProject() {
  // const modal = Modal.getOrCreateInstance('#project-modal').show()
  projectsService.setActiveProject(props.project)
  router.push({ name: 'Gallery', query: { project: props.project.name } })
}

function formatDate(raw) {
  try {
    let date = new Date(raw)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()]
    return `${month} ${date.getFullYear()}`
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<style lang="scss" scoped>
.published-eye {
  position: absolute;
  left: 2px;
  top: 2px;
}

.card-wrapper {
  overflow: hidden;
}

.project-card {
  position: relative;
  opacity: 0;
  animation: reveal .2s forwards linear;
  display: grid;
  max-width: 100%;
  object-fit: cover;
  transition: all .1s ease;
}

// STUB SHARP
.theme-sharp {
  width: 100%;
  background-image: v-bind(bgImage);
  background-size: cover;
  background-position: center;
  justify-content: start;
  align-items: end;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
    grid-row: 1;
    grid-column: 1;
  }

  .details {
    grid-row: 1;
    grid-column: 1;
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

//STUB CARD
.theme-card {
  height: 100%;
  display: flex;
  flex-direction: column;

  img {
    height: 75%;
    object-fit: cover;
    display: block !important;
  }

  .details {}

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
