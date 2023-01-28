<template>
  <QModal id="create-piece">
    <div class="row justify-content-between text-light p-3">
      <div class="col-11 pb-2 border-bottom border-dark">
        <div>Add Piece</div>
      </div>
      <div class="col-1 text-end border-bottom border-dark">
        <button class="btn selectable text-light">
          <i class="mdi mdi-close" data-bs-dismiss="modal"></i>
        </button>
      </div>
      <!-- form -->
      <form @submit.prevent="addPiece()">
        <div class="col-12 my-2">
          <label for="" class="form-label">Name</label>
          <UploadButton @uploadComplete="handleUpload" />
        </div>
        <div class="col-12 my-2">
          <label for="" class="form-label">Name</label>
          <input type="text" v-model="piece.fileName" class="form-control" name="" id="" aria-describedby="helpId"
            placeholder="Gallery Name" required>
        </div>
        <div class="col-12 my-2">
          <div class="form-check form-switch justify-content-end">
            <input type="checkbox" v-model="showBody" class="form-check-input" checked role="switch"
              id="flexSwitchCheckDefault">
            <small>only published Galleries will visible to visitors</small>
          </div>
        </div>
        <div class="col-12 my-2 text-end">
          <button class="btn text-light mx-3 selectable" type="button">cancel</button>
          <button class="btn btn-info">Add</button>
        </div>
      </form>
    </div>
  </QModal>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
const piece = ref({})
const showBody = ref(false)

async function addPiece() {
  try {

  } catch (error) {
    Pop.error(error)
  }
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
</style>
