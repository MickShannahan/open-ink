<template>
  <QModal id="reorder-pieces" size="modal-xl">
    <section class="row justify-content-between text-light p-3">
      <!-- header -->
      <div class="col-11 pb-2 border-bottom border-dark">
        <div>Re Order {{ pieces.length }} Pieces</div>
      </div>
      <div class="col-1 text-end border-bottom border-dark">
        <button class=" selectable text-light">
          <i class="mdi mdi-close" data-bs-dismiss="modal"></i>
        </button>
      </div>
    </section>
    <!-- Body -->
    <section class="order-grid p-3">

      <div v-for="(p, i) in pieces" :key="p.id" draggable="true" @dragstart="pickup(p, i)" :class="{
        'move-left': draggingOver == i + 'left',
        'move-right': draggingOver == i + 'right',
      }" class="order-item selectable text-theme-secondary" :style="`background-image: url(${p.smallUrl})`">
        <div class="droppable ahead" @dragover.prevent="dragging(i, 'right')" @drop="dropItem(p, i, 1)"></div>
        <div class="droppable behind" @dragover.prevent="dragging(i, 'left')" @drop="dropItem(p, i, -1)"></div>
      </div>

    </section>
  </QModal>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { piecesService } from '../services/PiecesService.js';
const pieces = ref([])
const selectedPiece = ref({})
const selectedIndex = ref(0)
const draggingOver = ref(0)
onMounted(() => {
  let modal = document.querySelector('#reorder-pieces')
  modal.addEventListener('show.bs.modal', () => {
    logger.log('starting order')
    pieces.value = [...AppState.pieces]
    sortPieces()
  })
  modal.addEventListener('hidden.bs.modal', () => {
    logger.log('saving piece order')
    savePieces()
  })
})

function pickup(p, from) {
  logger.log('picking up', from)
  selectedPiece.value = p
  selectedIndex.value = from
}

function dropItem(p, index, to) {
  logger.log('dropping', selectedIndex.value, 'on', index)
  selectedPiece.value.order = index
  pieces.value.forEach((p, i) => {
    if (i >= index && i != selectedIndex.value) {
      logger.log('shifing ', i, ' => ', i + to)
      p.order += to
    }
  })
  sortPieces()
  selectedIndex.value = 0
  selectedPiece.value = {}
  draggingOver.value = 0
}

function sortPieces() {
  pieces.value = pieces.value.sort((a, b) => a.order - b.order)
  pieces.value.forEach((p, i) => p.order = i)
}

function dragging(index, dir) {
  draggingOver.value = index + dir
}

async function savePieces() {
  try {
    pieces.value.forEach(p => {
      piecesService.updatePiece(p)
    })
  } catch (error) {
    Pop.error(error)
  }
}

</script>



<style lang="scss" scoped>
$image-size: 180px;

.order-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-auto-rows: 200px;
  justify-content: center;
  gap: .5em;

  .order-item {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    padding: .25rem;
    transform: translateX(0px);
    transition: all .2s ease;
    border-radius: 3px;

    &.move-left {
      transform: translateX(-25px);
    }

    &.move-right {
      transform: translateX(25px);
    }

    .ahead {
      grid-row: 1 /1;
    }

    .behind {
      grid-row: 1 /1;
    }

  }

}
</style>
