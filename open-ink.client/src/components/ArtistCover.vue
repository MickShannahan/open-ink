<template>
  <div class="cover-theme container-fluid sticky-top">
    <div class="top row"></div>
    <div class="bottom sticky-top row mb-4">
      <div class="col-md-4"></div>
      <div class="col-md-4 d-flex justify-content-center">
        <slot>
          <!-- SECTION  -->
        </slot>
      </div>
      <div class="col-md-4"></div>
    </div>
    <button v-if="isArtist" class="ui-border btn selectable text-light edit-button"><i class="mdi mdi-dots-horizontal"
        data-bs-toggle="modal" data-bs-target="#piece-selector"></i>
      <PieceSelector @selected="editCover" />
    </button>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
const artist = computed(() => AppState.artist)
const theme = computed(() => AppState.artist.theme)
const isArtist = computed(() => AppState.account.id == artist.value.id)

async function editCover(image) {
  try {
    logger.log('updating theme', image)
    await accountService.saveTheme({ cover: image.imgUrl, coverType: 'image' })
    Pop.toast('Cover Updated', 'success', 'top')
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<style lang="scss" scoped>
.cover-theme {
  background-position: center;
  background-size: cover;

  position: relative;

  &::after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60%;
    content: '';
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%);
  }
}

.edit-button {
  position: absolute;
  left: 1rem;
  top: 1rem;
}

.top {
  min-height: 5vh;
}

.bottom {}
</style>
