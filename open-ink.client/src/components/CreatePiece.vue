<template>
  <QModal id="create-piece">
    <div class="row justify-content-between text-light p-3">
      <div class="col-11 pb-2 border-bottom border-dark">
        <div>Add Piece</div>
      </div>
      <div class="col-1 text-end border-bottom border-dark">
        <button class=" selectable text-light">
          <i class="mdi mdi-close" data-bs-dismiss="modal"></i>
        </button>
      </div>
      <!-- form -->
      <form class="row justify-content-center" @submit.prevent="addPieces()">
        <!-- previews -->
        <div v-for="file in files" class="col-6 my-2 piece-preview">
          <img class="img-fluid rounded square-bottom" :src="file.url" alt="">
          <div class="input-group">
            <input type="text" v-model="file.fileName" required class="form-control square-top w-75">
            <button type="button" class=" selectable text-danger border border-danger square-top"
              @click="remove(file.fileName)"><i class="mdi mdi-cancel"></i></button>
          </div>
        </div>
        <!--  -->
        <!-- drop section -->
        <div v-if="!uploading" class="col-12 my-2">
          <UploadButton @uploadComplete="handleUpload" @uploading="addToFiles" />
        </div>
        <div v-else class="progress p-0">
          <div class="progress-bar progress-bar-striped progress-bar-animated bg-accent" role="progressbar"
            :style="`width: ${100 - Math.round((loading / needLoad) * 100)}%;`" aria-valuenow="25" aria-valuemin="0"
            aria-valuemax="100">uploading... {{ loading }}
          </div>
        </div>
        <!--  -->
        <div class="col-12 my-2 text-end">
          <button class=" text-light mx-3 selectable" type="button" data-bs-dismiss="modal">cancel</button>
          <button class="text-theme-secondary btn-theme selectable">Add</button>
        </div>
      </form>
    </div>
  </QModal>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, defineProps } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { piecesService } from '../services/PiecesService.js'
import { Modal } from 'bootstrap';
const piece = ref({})
const needLoad = ref(0)
const loading = computed(() => AppState.loading)
const preview = ref('')
const showBody = ref(false)
const files = ref([])
const uploading = ref(false)

async function addPieces() {
  try {
    uploading.value = true
    needLoad.value = files.value.length * 2
    await piecesService.addPieces(files.value, AppState.account)
    uploading.value = false
    Pop.toast(`${files.value.length} pieces uploaded`, 'success', 'top')
    files.value = []
    Modal.getOrCreateInstance('#create-piece').hide()
  } catch (error) {
    Pop.error(error)
  }
}

function addToFiles(payload) {
  logger.log('adding', payload)
  payload.showBody = false
  payload.fileName = payload.file.name
  files.value.push(payload)
}

function remove(filename) {
  logger.log('removing', filename)
  let index = files.value.findIndex(f => filename == f.fileName)
  if (index >= 0) files.value.splice(index, 1)
}

function handleUpload(up) {
  logger.log('uploaded', up)
  piece.value.width = up.width
  piece.value.height = up.height
  piece.value.imgUrl = up.url
  piece.value.smallUrl = up.smallUrl
  piece.value.blurHas = up.blurHash
}

</script>


<style lang="scss" scoped>
input,
textarea {
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--bs-light);
  accent-color: var(--bs-primary);
}

input:focus,
textarea:focus {
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
}

.piece-preview {
  // max-height: 15vh;
  // object-fit: contain;
}

.progress {
  height: 30px;
}
</style>
