<template>
  <div class="row justify-content-center mt-4">

    <div v-for="p in pieces" class="col-12 my-3 px-0">
      <div class="img-wrapper">
        <BImage :image="p" />
        <button class="btn btn-dark selectable text-light fullscreen-btn">
          <i class="mdi mdi-fullscreen"></i>
        </button>
      </div>
    </div>

  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import BImage from './BImage.vue';

const pieces = computed(() => AppState.pieces)
</script>


<style lang="scss" scoped>
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

  &:hover .fullscreen-btn {
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
