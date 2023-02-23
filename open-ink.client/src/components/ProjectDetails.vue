<template>
  <section class="row p-2 mt-3 text-theme-color">
    <div class="col-12 pt-3 mb-5">
      <h4 class="text-theme-secondary mb-1">
        {{ project.name }}
        <span v-if="!project.published" v-tooltip:auto="`not published`"><i class="mdi mdi-eye-off"></i></span>
      </h4>
      <div class="mb-2 date">
        <small>
          {{ formatDate(project.createdAt) }}
        </small>
      </div>
      <p class="mobile-expand">{{ project.body }}</p>
    </div>
    <div v-if="project.software?.length" class="col-12 mobile-expand text-end pe-3 mb-4">
      <h5>Tools</h5>
      <span v-for="soft in project.software" class="p-1 px-3 m-1 rounded-pill bg-theme-accent darken-20">{{
        soft
      }}</span>
    </div>
    <div v-if="project.tags?.length" class="col-12 mobile-expand mt-3 text-end pe-3">
      <div class="pb-2">Tags <i class="mdi mdi-tag"></i></div>
      <div class="">
        <div v-for="tag in project.tags" class=" p-1 px-3 tag m-1 rounded-pill bg-accent">{{ tag }}</div>
      </div>
    </div>
  </section>
  <!-- SECTION related projects -->
  <section class="row mobile-expand mt-5 text-end p-3 " v-if="relatedProjects.length">
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

function formatDate(raw) {
  try {
    let date = new Date(raw)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()]
    return `${month} ${date.getDate()} ${date.getFullYear()}`
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<style lang="scss" scoped>
.tag {
  opacity: .9;
  display: inline-block;
}

.date {
  opacity: .8;
}
</style>
