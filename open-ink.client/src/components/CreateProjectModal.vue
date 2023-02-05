<template>
  <QModal :id="id" class="container-fluid">
    <div class="row justify-content-between text-light p-3">
      <div class="col-11 pb-2 border-bottom border-dark">
        <div v-if="!projectData">Add Project to <span class="text-theme-primary">{{ $route.params?.gallery }}</span>
        </div>
        <div v-else>Edit <span class="text-theme-primary">{{ $route.params?.gallery }}</span></div>
      </div>
      <div class="col-1 text-end border-bottom border-dark">
        <button class=" selectable text-light">
          <i class="mdi mdi-close" data-bs-dismiss="modal"></i>
        </button>
      </div>
    </div>
    <!-- form -->
    <form class="row text-light p-3" @submit.prevent="handleSubmit()">
      <div class="col-12 my-2"> <!-- STUB NAME -->
        <label for="" class="form-label">Name of piece</label>
        <input type="text" v-model="project.name" class="form-control" name="" id="" aria-describedby="helpId"
          placeholder="Project Name" required>
      </div>
      <div class="col-12 my-2"><!-- STUB Descrition -->
        <label for="" class="form-label">Description of project</label>
        <textarea class="form-control" name="body" id="project-form-body" rows="3" v-model="project.body"></textarea>
      </div>
      <div class="col-md-6 my-2"><!-- STUB Software -->
        <label for="" class="form-label">Tools Used</label>
        <input type="text" v-model="project.software" placeholder="acrylic, blender, clip studio paint"
          class="form-control" name="" id="" aria-describedby="helpId">
        <small>comma separated</small>
      </div>
      <div class="col-md-6 my-2"><!-- STUB Tags -->
        <label for="" class="form-label">tags</label>
        <input type="text" v-model="project.tags" class="form-control" name="" id="" aria-describedby="helpId"
          placeholder="comma separated">
        <small>projects with similar tags will link to each other.</small>
      </div>
      <div class="col-12 my-2"><!-- STUB PUBLISHED -->
        <div class="form-check form-switch justify-content-end">
          <input type="checkbox" v-model="project.published" class="form-check-input" checked role="switch"
            id="flexSwitchCheckDefault">
          <div class="form-check-label" for="flexSwitchCheckDefault">Published</div>
          <small>only published Galleries will visible to visitors</small>
        </div>
      </div>
      <div class="col-12 my-2"><!-- STUB NSFW -->
        <div class="form-check form-switch justify-content-end">
          <input type="checkbox" v-model="project.nsfw" class="form-check-input" role="switch"
            id="flexSwitchCheckDefault">
          <div class="form-check-label" for="flexSwitchCheckDefault">Not Safe For Work</div>
          <small>Galleries marked NSFW will be prompted with an age gate before entering</small>
        </div>
      </div>
      <div class="col-12 my-2 text-end"><!-- STUB Buttons -->
        <button class=" text-light mx-3 selectable" type="button">cancel</button>
        <button v-if="projectData" class=" btn-info">Save</button>
        <button v-else class=" btn-info">Create</button>
      </div>
    </form>
  </QModal>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js';
import { router } from '../router.js';
import { Modal } from 'bootstrap';
import { logger } from '../utils/Logger.js';

const match = /, |,/g
const props = defineProps({ projectData: { type: Object, required: false }, id: String })
const project = ref({})
const gallery = computed(() => AppState.activeGallery)

watchEffect(() => {
  project.value = { ...props.projectData }
})

function handleSubmit() {
  if (props.projectData) {
    updateProject()
  } else {
    createProject()
  }
}

async function createProject() {
  try {
    const newProject = { ...project.value }
    newProject.galleryId = gallery.value.id
    newProject.tags = newProject.tags?.split(match)
    newProject.software = newProject.software?.split(match)
    const proj = await projectsService.createProject(newProject)
    Pop.toast(`${proj.name} Created`)
    Modal.getOrCreateInstance('#' + props.id).hide()
    project.value = {}
    router.push({ name: 'Gallery', query: { project: proj.name } })
  } catch (error) {
    Pop.error(error)
  }
}

async function updateProject() {
  try {
    const update = { ...project.value }
    update.galleryId = gallery.value.id
    logger.log(update)
    if (!Array.isArray(update.tags)) update.tags = update.tags.split(match)
    if (!Array.isArray(update.software)) update.software = update.software.split(match)
    await projectsService.update(update)
    Pop.toast(`${update.name} Updated`)
    Modal.getOrCreateInstance('#' + props.id).hide()
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<style lang="scss" scoped>
input,
textarea {
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--bs-light);
  accent-color: var(--bs-primary);
}

input:focus,
textarea:focus {
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
}

small {
  opacity: .6;
}

label {
  font-weight: bolder;
}
</style>
