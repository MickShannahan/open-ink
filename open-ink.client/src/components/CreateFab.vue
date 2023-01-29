<template>
  <div class="fab-wrapper text-end">
    <div id="create-menu" class="collapse rounded">
      <div class="d-flex flex-column ">
        <div class="selectable btn rounded-pill text-light" data-bs-toggle="modal" data-bs-target="#create-gallery"
          @click="collapseMenu">
          Create Gallery</div>
        <div class="selectable btn rounded-pill text-light" data-bs-toggle="modal" data-bs-target="#create-project"
          @click="collapseMenu">
          Create Project</div>
      </div>
    </div>
    <button data-bs-toggle="collapse" data-bs-target="#create-menu"
      class="selectable btn rounded-circle text-primary"><i class="mdi mdi-plus"></i></button>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Collapse } from 'bootstrap';

function collapseMenu() {
  Collapse.getOrCreateInstance('#create-menu').hide()
}

</script>


<style lang="scss" scoped>
button {
  width: 50px;
  height: 50px;
}
</style>
