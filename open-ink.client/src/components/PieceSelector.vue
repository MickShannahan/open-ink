<template>
  <QModal id="piece-selector">
    <div class="d-flex justify-content-between p-2">
      <div>select an image</div>
      <div>
        <button class=" rounded text-theme-accent selectable px-2" @click="size = '200px'"><i
            class="mdi mdi-apps"></i></button>
        <button class=" rounded text-theme-accent selectable px-2" @click="size = '150px'"><i
            class="mdi mdi-view-comfy"></i></button>
      </div>
    </div>
    <div class="masonry">
      <div class="item text-theme-accent selectable" v-for="p in pieces" @click="selectImage(p)">
        <BImage :image="p" />
      </div>
    </div>
  </QModal>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { artistsService } from '../services/ArtistsService.js';
import { Modal } from 'bootstrap';
import { useRoute } from 'vue-router';
import BImage from './BImage.vue';

const route = useRoute()
const pieces = computed(() => AppState.pieces)
const size = ref('150px')
const emit = defineEmits()
onMounted(() => {
  document.getElementById('piece-selector').addEventListener('show.bs.modal', getArtistPieces)
})

async function getArtistPieces() {
  try {
    await artistsService.getArtistPieces(route.params.artist)
  } catch (error) {
    Pop.error(error)
  }
}

function selectImage(piece) {
  emit('selected', piece)
  Modal.getOrCreateInstance('piece-selector').hide()
}

</script>


<style lang="scss" scoped>
.masonry {
  columns: v-bind(size);
  column-gap: 5px;

  .item {
    width: 100%;
    // object-fit: cover;
    margin-bottom: 5px;
  }
}
</style>
