<template>
  <!-- Modal Body -->
  <section v-show="open" id="project-modal" class="p-backdrop" tabindex="0">
    <div class="container-fluid px-2">
      <button @click="closeModal" class="btn selectable text-light position-absolute"><i class="mdi mdi-arrow-left"></i>
        back to {{
          $route.params.gallery
        }}</button>
      <section class="row height-screen justify-content-end">
        <!-- SECTION descirption -->
        <div class="side-bar col-md-3 order-0 order-md-1 bg-bg d-flex flex-column justify-content-between"
          :class="{ expand }">
          <div>
            <ProjectDetails />
            <button @click="expand = !expand" class="expand-button position-absolute text dark">expand</button>
          </div>
          <ProjectTools class="project-tools" v-if="isArtist" />
        </div>
        <!-- SECTION pictures -->
        <div class="main-thread col-md-9 max-height-screen scrollable-y no-bar" :class="{ nsfw }">
          <PiecesThread v-if="project.id" />
        </div>
      </section>
    </div>
  </section>
</template>


<script setup>
import { AppState, isArtist } from '../AppState';
import { computed, reactive, onMounted, watchEffect, watch, ref } from 'vue';
import { projectsService } from '../services/ProjectsService.js'
import { router } from '../router.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import ProjectDetails from './ProjectDetails.vue';
import PiecesThread from './PiecesThread.vue';
import { matureService } from '../services/MatureService.js';
const route = useRoute()
const nsfw = ref(false)
const expand = ref(false)

const open = ref(false)
const listeners = ref([])
const projectRoute = computed(() => route.query.project)
const project = computed(() => AppState.activeProject)
const projects = computed(() => AppState.projects)


watchEffect(() => {
  logger.log('MODAL WATCH')
  if (route.query.project) {
    openModal()
  }
})

watch(projects, () => {
  logger.log('PROJECTS WATCH', projects.value)
  let found = projects.value.find(p => p.name == route.query.project)
  if (found) {
    loadProject(found)
  }
})

watch(open, () => {
  if (open.value) {

  } else {
    clearRouteQuery()
  }
})


async function loadProject(project) {
  try {
    logger.log('loading project', project)
    projectsService.setActiveProject(project)
    await projectsService.getProjectPieces(route.params.artist, project.id)
    await projectsService.getRelated(project.id)
  } catch (error) {
    Pop.error(error)
  }
}

function openModal(e) {
  open.value = true
  document.body.classList.add('lock-y')
  setTimeout(() => {
    document.querySelector('#project-modal')?.classList.add('p-show')
  }, 10)
}
function closeModal(e) {
  document.querySelector('#project-modal')?.classList.remove('p-show')
  setTimeout(() => {
    open.value = false
    document.body.classList.remove('lock-y')
  }, 100)
}
function clearRouteQuery() {
  router.push({ name: 'Gallery' })
}

function mountListener(query, event, func) {
  logger.log('mounted', query, event)
  document.querySelector(query).addEventListener(event, func)
  listeners.value.push({ query, event, func })
}
function clearListeners() {
  listeners.value.forEach(l => document.querySelector(l.query).removeEventListener(l.event, l.func))
  listeners.value = []
}

</script>


<style lang="scss">
.side-bar {
  max-width: 27rem;
  // min-width: 300px;
}

.expand-button {
  position: absolute;
  top: 0;
  right: 0;
}

@media (max-width: 768px) {
  .side-bar {
    max-width: unset;
    max-height: 12vh;
    overflow-y: hidden;
    transition: all .1s ease;

    .mobile-expand {
      transform: scaleY(0);
      opacity: 0;
      transition: all .2s ease;
      transform-origin: top;
    }

    &.expand {
      max-height: 40vh;
      overflow-y: scroll;

      .mobile-expand {
        transform: scaleY(1);
        opacity: 1;
      }
    }
  }
}

.main-thread {}

.p-backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1054;
  opacity: 1 !important;
  background-color: transparent;
  backdrop-filter: blur(15px) !important;
  transition: all .2s linear;
}

.p-show {
  background-color: rgba(0, 0, 0, 0.85);
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 1055;
}

.project-container {
  height: 100vh !important;
  width: 100vw !important;
}
</style>
