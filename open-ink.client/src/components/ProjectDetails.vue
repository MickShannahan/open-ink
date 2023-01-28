<template>
  <section class="row mt-5">
    <div class="col-12">
      <h4>
        {{ project.name }}
      </h4>
      <p>{{ project.body }}</p>
    </div>
  </section>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';

const project = computed(() => AppState.activeProject)

</script>


<style lang="scss" scoped>

</style>
