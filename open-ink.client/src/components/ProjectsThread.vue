<template>
  <div v-if="editing" class="d-flex project-thread justify-content-end mt-2 grow-reveal-top">
    <div class=" m-1 mb-3">
      <h4 class=" text-theme-secondary"> {{ gallery.name }} <span class="published-eye" v-if="gallery.nsfw"
          title="mature"><i class="mdi mdi-fire"></i></span></h4>
      <div v-if="!gallery.published"><small> not published </small><i class="mdi mdi-eye-off"></i></div>
    </div>
    <button class=" p-1 px-4 ms-2 ui-border text-theme-secondary selectable h-50 rounded-pill" title="edit Gallery"
      data-bs-toggle="modal" data-bs-target="#edit-gallery"><i class="mdi mdi-pen"></i></button>
    <button class="p-1 px-4 ms-2 ui-border text-theme-secondary selectable h-50 rounded-pill"
      data-bs-target="#create-project" data-bs-toggle="modal" title="create a new project">
      <i class="mdi mdi-folder"></i>
      <i class="mdi mdi-plus"></i>
    </button>
    <button v-if="!reordering" class=" p-1 px-4 ms-2 ui-border text-theme-secondary selectable h-50 rounded-pill"
      title="re-order projects" @click="startReorder"><i class="mdi mdi-swap-horizontal"></i> <i
        class="mdi mdi-image"></i></button>
    <button v-if="reordering" class=" p-1 px-4 ms-2 ui-border text-theme-secondary selectable h-50 rounded-pill"
      title="save order" @click="saveReorder"><i class="mdi mdi-swap-horizontal"></i><i
        class="mdi mdi-floppy"></i></button>

    <button class=" p-1 px-4 ms-2 ui-border text-theme-secondary selectable h-50 rounded-pill" title="delete Gallery"
      @click="removeGallery"><i class="mdi mdi-delete-forever"></i></button>

  </div>
  <h3 v-if="reordering" class="text-theme-secondary text-center"><i class="mdi mdi-lock-open"></i></h3>
  <div v-if="projects.length" class=" project-thread"
    :class="{ 'layout-squares': theme.layout == 'squares', 'layout-columns': theme.layout == 'columns' }">
    <!-- <button v-if="isArtist" class="add-project p-3" data-bs-target="#create-project" data-bs-toggle="modal">
      <div class="ui-border d-flex justify-content-center h-100 text-theme-secondary selectable align-items-center">
        Add project
        <i class="mdi mdi-plus"></i>
      </div>
    </button> -->
    <ProjectCard class="project-card" :class="{ 'dragOver': dragOver == i }" @dragover.prevent="dragOver = i"
      :draggable="reordering" @dragstart="pickup(p, i)" @drop="drop(p, i)" v-for="(p, i) in projects" :project="p" />
  </div>
  <div v-else class=" project-thread text-center p-5">
    <div>
      <h6 class="text-theme-color">no projects to show yet</h6>
      <button v-if="isArtist" class="selectable text-theme-secondary rounded-pill p-2 px-3"
        data-bs-target="#create-project" data-bs-toggle="modal">create one <i class="mdi mdi-plus"></i></button>
    </div>
    <img class="placeholder-svg text-theme-secondary" src="/src/assets/img/unDraw/undraw_making_art_re_ee8w.svg" alt="">
  </div>
</template>


<script setup>
import { AppState, isArtist } from '../AppState.js';
import { computed, ref } from 'vue'
import Pop from '../utils/Pop.js';
import { galleriesService } from '../services/GalleriesService.js';
import { router } from '../router.js';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { projectsService } from '../services/ProjectsService.js';
const route = useRoute()
const theme = computed(() => AppState.artist.theme)
const gallery = computed(() => AppState.activeGallery)
const account = computed(() => AppState.account)
const projects = computed(() => AppState.projects.sort((a, b) => a.order - b.order))
const editing = computed(() => AppState.editing.gallery)
const reordering = ref(false)
const pickUp = ref({})
const pickUpI = ref(0)
const dragOver = ref(null)
// theme
const gap = computed(() => theme?.value.gap + 'px')
const columns = computed(() => `${theme.value?.columns}px`)
const gridColumns = computed(() => `repeat(auto-fill, minmax(${theme.value?.columns}px, 1fr)`)
const gutter = computed(() => `${0}px ${theme?.value.gutter}%`)


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

function startReorder() {
  reordering.value = true
}

async function saveReorder() {
  reordering.value = false
  if (!projects.value.every((p, i) => p.order == i))
    return
  const proms = []
  projects.value.forEach(p => proms.push(projectsService.update(p)))
  await Promise.all(proms)
  Pop.toast('Order Saved', 'success', 'top')
}

function pickup(project, index) {
  logger.log('picked up', index)
  pickUp.value = project
  pickUpI.value = index
}
function drop(project, index) {
  logger.log('dropped up', index)
  let move = index < pickUpI.value ? -1 : 1
  pickUp.value.order = index + move
  project.order = index + (move * -1)
  projects.value.slice(index).forEach((p, i) => {
    if (pickUpI.value != i) p.order++
  })
  reorderProjects()
}

function reorderProjects() {
  dragOver.value = null
  pickUp.value = {}
  pickUpI.value = 0
  projects.value.sort((a, b) => a.order - b.order)
  projects.value.forEach((p, i) => p.order = i)
}
</script>


<style lang="scss">
.placeholder-svg {
  width: 20%;
  opacity: .7;
  filter: grayscale(.2) invert(1) drop-shadow(1px 0px 0px rgba(255, 255, 255, 0.164));
}

.project-card {
  transition: transform .2s ease;
}

.dragOver {
  transform: translateY(-20px) rotateZ(3deg);
}

.create-project {
  border: 1px solid;
  aspect-ratio: 1/1;
}

.project-thread {
  padding: v-bind(gutter);
  transition: all .1s ease;

  .add-project {
    width: 100%;
    aspect-ratio: 1/1;
  }
}

.layout-squares {
  display: grid;
  grid-template-columns: v-bind(gridColumns);
  gap: v-bind(gap);
  padding-top: v-bind(gap);
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
  padding-top: v-bind(gap);
  column-fill: balance;

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
