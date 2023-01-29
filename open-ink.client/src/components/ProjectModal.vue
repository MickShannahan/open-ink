<template>
  <!-- Modal Body -->
  <section v-show="open" id="project-modal" class="backdrop" tabindex="0">
    <div class="container-fluid px-2">
      <button @click="closeModal" class="btn selectable text-light position-absolute"><i class="mdi mdi-arrow-left"></i>
        back to {{
  $route.params.gallery
        }}</button>
      <section class="row max-height-screen">
        <!-- SECTION descirption -->
        <div class="col-md-3 order-0 order-md-1 bg-bg">
          <ProjectDetails />
        </div>
        <!-- SECTION pictures -->
        <div class="col-9 max-height-screen scrollable-y no-bar">
          <PiecesThread />
        </div>
      </section>
    </div>
  </section>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, watch, ref } from 'vue';
import { projectsService } from '../services/ProjectsService.js'
import { router } from '../router.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import ProjectDetails from './ProjectDetails.vue';
import PiecesThread from './PiecesThread.vue';
const route = useRoute()

const open = ref(false)
const listeners = ref([])

const project = computed(() => AppState.activeProject)

watchEffect(() => {
  logger.log('modal watch')
  if (route.query?.project !== undefined) {
    openModal()
    loadProject()
  } else {
    closeModal()
  }
})
watch(open, () => {
  if (open.value) {// OPEN
    logger.log('opening')
    loadProject()
    // mountListener('#project-modal', 'keydown', clearRouteQuery) TODO add escape
  } else { // -----  CLOSE
    logger.log('closing')
    clearListeners()
    clearRouteQuery()
  }
})

async function loadProject() {
  try {
    const project = AppState.projects.find(p => p.name == route.query.project)
    if (project) {
      projectsService.setActiveProject(project)
      await projectsService.getProjectPieces(route.params.artist, project.id)
    }
  } catch (error) {
    Pop.error(error)
  }
}

function openModal(e) {
  open.value = true
  document.body.classList.add('lock-y')
  setTimeout(() => {
    document.querySelector('#project-modal')?.classList.add('show')
  }, 10)
}
function closeModal(e) {
  document.querySelector('#project-modal')?.classList.remove('show')
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
.backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10001;
  opacity: 1 !important;
  background-color: transparent;
  backdrop-filter: blur(15px) !important;
  transition: all .2s linear;
}

.show {
  background-color: rgba(0, 0, 0, 0.85);
}

.project-container {
  height: 100vh !important;
  width: 100vw !important;
}
</style>
