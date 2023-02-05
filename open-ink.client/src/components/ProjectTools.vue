<template>
  <div class="row p-3">
    <div class="col-12 text-center p-2 ui-border">
      <div class=" text-center text-theme-secondary fw-bold selectable rounded-pill" data-bs-target="#project-tools"
        data-bs-toggle="collapse">
        project tools <i class="mdi mdi-tools"></i>
      </div>
      <!-- TOols -->
      <section id="project-tools" class="row collapse">
        <div class="col-12 ">
          <button class="selectable p-2 px-3 rounded-pill" data-bs-toggle="modal" data-bs-target="#reorder-pieces">
            Re-order Pieces <i class="mdi mdi-image"></i><i class="mdi mdi-swap-vertical"></i>
            <ReOrderPieces />
          </button>
        </div>
        <div class="col-12 ">
          <button class="selectable p-2 px-3 rounded-pill" data-bs-toggle="modal" data-bs-target="#create-piece">
            Add Pieces <i class="mdi mdi-image"></i><i class="mdi mdi-plus"></i>
            <CreatePiece />
          </button>
        </div>
        <div class="col-12 ">
          <button class="selectable p-2 px-3 rounded-pill" data-bs-toggle="modal" data-bs-target="#edit-project">
            edit project <i class="mdi mdi-folder"></i><i class="mdi mdi-pen"></i>
            <CreateProjectModal id="edit-project" :projectData="project" />
          </button>
        </div>
        <div class="col-12 ">
          <button class="selectable p-2 px-3 rounded-pill" @click="removeProject()">
            delete project <i class="mdi mdi-folder"></i><i class="mdi mdi-delete-forever"></i>
          </button>
        </div>
      </section>
      <!-- s -->
      <div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import CreatePiece from './CreatePiece.vue';
import CreateProjectModal from './CreateProjectModal.vue';
import { projectsService } from '../services/ProjectsService.js';
import Pop from '../utils/Pop.js';
const project = computed(() => AppState.activeProject)
const pieces = computed(() => AppState.pieces)

async function removeProject() {
  try {
    if (await Pop.confirm(`Delete ${project.value.name}?`)) {
      await projectsService.removeProject(project.value.id)
      router.push({ name: 'Gallery' })
    }
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<style lang="scss" scoped>

</style>
