<template>
  <!-- SECTION add pieces -->
  <CreatePiece />
  <div class="row">
    <div class="col-12">
      <button class="btn btn-outline-light rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#create-piece"><i
          class="mdi mdi-plus"></i></button>
      <button class="btn btn-outline-light rounded-pill px-4"><i class="mdi mdi-dots-horizontal"></i></button>
    </div>
  </div>
  <!--  -->
  <section class="row p-2 mt-3 text-light">
    <div class="col-12 pt-3">
      <h4>
        {{ project.name }}
      </h4>
      <p>{{ project.body }}</p>
    </div>
    <div v-if="project.software?.length" class="col-12">
      <h5>Software</h5>
      <span v-for="soft in project.software" class="p-1 px-3 m-1 rounded-pill bg-primary darken-20">{{ soft }}</span>
    </div>
    <div v-if="project.tags?.length" class="col-12 mt-3">
      <div class="pb-2">Tags <i class="mdi mdi-tag"></i></div>
      <span v-for="tag in project.tags" class="p-1 px-3 m-1 rounded-pill bg-dark">{{ tag }}</span>
    </div>
  </section>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import CreatePiece from './CreatePiece.vue';

const project = computed(() => AppState.activeProject)

</script>


<style lang="scss" scoped>

</style>
