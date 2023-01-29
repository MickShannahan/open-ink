<template>
  <div class="row justify-content-center mt-4">

    <div v-for="p in pieces" class="col-12 my-3 px-0 piece" :key="p.id">
      <div class="img-wrapper">
        <BImage :image="p" />
        <button class="btn btn-dark selectable text-light fullscreen-btn" title="open image source">
          <a target="_blank" :href="p.imgUrl"><i class="mdi mdi-fullscreen"></i> </a>
        </button>
        <button class="btn btn-dark selectable text-light cover-btn" title="set as project cover" @click="setCover(p)">
          <i class="mdi mdi-image text-theme-primary"></i>
        </button>
      </div>
    </div>

  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import BImage from './BImage.vue';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js';

const pieces = computed(() => AppState.pieces)
async function setCover(piece) {
  try {
    await projectsService.update({ coverImg: piece.smallUrl, coverBlur: piece.blurHas, id: AppState.activeProject.id })
    Pop.toast('Cover Image Set', 'success', 'top')
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<style lang="scss" scoped>
.piece {}

.img-wrapper {
  position: relative;

  .btn-dark {
    border: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .fullscreen-btn {
    position: absolute;
    right: .25rem;
    bottom: .5rem;
    opacity: 0;
    transform: scale(0);
    // display: none;
  }

  .cover-btn {
    position: absolute;
    right: .25rem;
    bottom: 3rem;
    opacity: 0;
    transform: scale(0);
    // display: none;
  }

  &:hover .fullscreen-btn,
  &:hover .cover-btn {
    animation: reveal .2s .5s forwards linear;
  }
}

@keyframes reveal {
  0% {
    opacity: 0;
    transform: scale(0);
    display: none;
  }

  10% {
    opacity: 0;
    transform: scale(1);
    display: block;
  }

  100% {
    opacity: 1;
    transform: scale(1);
    display: block;
  }
}
</style>
