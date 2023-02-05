<template>
  <div class="row justify-content-center mt-4">

    <div v-for="p in pieces" class="col-12 my-3 px-0 piece" :key="p.id">
      <div class="img-wrapper">
        <BImage :image="p" />
        <div class="img-btns">
          <button class=" btn-dark selectable text-light fullscreen-btn" title="open image source">
            <a target="_blank" :href="p.imgUrl"><i class="mdi mdi-fullscreen"></i> </a>
          </button>
          <button v-if="account.id == gallery.ownerId" class=" btn-dark selectable text-light cover-btn"
            title="set as project cover" @click="setCover(p)">
            <i class="mdi mdi-image text-theme-primary"></i>
          </button>
          <button v-if="account.id == gallery.ownerId" class=" btn-dark selectable text-light delete-btn"
            title="delete piece" @click="removePiece(p)">
            <i class="mdi mdi-delete-forever text-theme-primary"></i>
          </button>
          <!-- <button v-if="p.order < pieces.length - 1 && account.id == gallery.ownerId"
            class=" btn-dark selectable text-light delete-btn" title="delete piece" @click="movePiece(p, 1)">
            <i class="mdi mdi-arrow-down text-theme-primary"></i>
          </button>
          <button class=" disabled text-light">{{ p.order }}</button>
          <button v-if="p.order > 0 && account.id == gallery.ownerId" class=" btn-dark selectable text-light delete-btn"
            title="delete piece" @click="movePiece(p, -1)">
            <i class="mdi mdi-arrow-up text-theme-primary"></i>
          </button> -->
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watch } from 'vue';
import BImage from './BImage.vue';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js';
import { logger } from '../utils/Logger.js';
import { piecesService } from '../services/PiecesService.js';

const pieces = computed(() => AppState.pieces.sort((a, b) => a.order - b.order))
const gallery = computed(() => AppState.activeGallery)
const account = computed(() => AppState.account)
async function setCover(piece) {
  try {
    await projectsService.update({ coverImg: piece.smallUrl, coverBlur: piece.blurHas, id: AppState.activeProject.id })
    Pop.toast('Cover Image Set', 'success', 'top')
  } catch (error) {
    Pop.error(error)
  }
}

async function removePiece(piece) {
  try {
    await piecesService.removePiece(piece.id)
    Pop.toast(`${piece.fileName} was removed`, 'info', 'top')
  } catch (error) {
    Pop.error(error)
  }
}

async function movePiece(piece, dir) {
  try {
    piece.order = piece.order + dir
    if (piece.order >= pieces.value.length - 1) {
      piece.order - pieces.value.length - 1
    } else if (piece.order <= 0) {
      piece.order = 0
    }
    await piecesService.updatePiece(piece)
  } catch (error) {
    Pop.error(error)
  }
}
watch(pieces, () => {
  logger.log('[PIECES CHANGED]', pieces.value)
})
</script>


<style lang="scss" scoped>
.piece {}

.img-wrapper {
  position: relative;

  .btn-dark {
    border: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .img-btns {
    position: absolute;
    right: .5rem;
    bottom: .5em;
    display: flex;
    flex-direction: column-reverse;

    button {
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1;
      margin-bottom: 5px;
      // display: none;
      // opacity: 0;
      transform: scale(0);
    }

    button:nth-child(1) {
      animation-delay: .35s;
    }

    button:nth-child(2) {
      animation-delay: .4s;
    }

    button:nth-child(3) {
      animation-delay: .45s;
    }

  }

  &:hover button {
    animation: reveal .2s forwards linear;
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
