<template>
  <!-- SECTION add pieces -->
  <!-- <CreatePiece />
  <CreateProjectModal id="edit-project" :projectData="project" />
  <div class="row mt-2 " v-if="account.id == project.ownerId">
    <div class="col-12">
      <button class=" ui-border text-theme-primary selectable rounded-pill px-4" data-bs-toggle="modal"
        data-bs-target="#create-piece" title="add pieces"><i class="mdi mdi-plus"></i><i
          class="mdi mdi-image"></i></button>
      <button class=" ui-border text-theme-primary selectable rounded-pill px-4" data-bs-toggle="modal"
        data-bs-target="#edit-project" title="edit project"><i class="mdi mdi-pen"></i><i
          class="mdi mdi-folder"></i></button>
      <button class=" ui-border text-danger selectable rounded-pill px-4" title="delete project"
        @click="removeProject"><i class="mdi mdi-delete-forever"></i><i class="mdi mdi-folder"></i></button>
    </div>
  </div> -->
  <!-- SECTION project details -->
  <section class="row p-2 mt-3 text-theme-color">
    <div class="col-12 pt-3 mb-5">
      <h4 class="text-theme-secondary">
        {{ project.name }}
      </h4>
      <p>{{ project.body }}</p>
    </div>
    <div v-if="project.software?.length" class="col-12 text-end pe-3 mb-4">
      <h5>Software</h5>
      <span v-for="soft in project.software" class="p-1 px-3 m-1 rounded-pill bg-theme-accent darken-20">{{
        soft
      }}</span>
    </div>
    <div v-if="project.tags?.length" class="col-12 mt-3 text-end pe-3">
      <div class="pb-2">Tags <i class="mdi mdi-tag"></i></div>
      <span v-for="tag in project.tags" class="p-1 px-3 tag m-1 rounded-pill bg-accent">{{ tag }}</span>
    </div>
  </section>
  <!-- SECTION related projects -->
  <section class="row mt-5 text-end p-3 " v-if="relatedProjects.length">
    <div class="col-12 mb-3 text-theme-color">
      related projects
    </div>
    <div class="col-12 d-flex justify-content-end text-end">
      <RelatedProject v-for="r in relatedProjects" :project="r" />
    </div>
  </section>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import CreatePiece from './CreatePiece.vue';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js';
import { useRoute, useRouter } from 'vue-router';
import CreateProjectModal from './CreateProjectModal.vue';
const router = useRouter()

const project = computed(() => AppState.activeProject)
const relatedProjects = computed(() => AppState.relatedProjects)
const account = computed(() => AppState.account)



async function removeProject() {
  try {
    await projectsService.removeProject(project.value.id)
    router.push({ name: 'Gallery' })
  } catch (error) {
    Pop.error(error)
  }
}


</script>


<style lang="scss" scoped>
.tag {
  opacity: .9;
}
</style>
