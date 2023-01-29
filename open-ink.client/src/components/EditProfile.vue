<template>
  <div class="edit-window rounded elevation-2 my-1 container-fluid align-items-between">
    <form @submit.prevent="saveTheme" class="d-flex flex-wrap text-light align-items-between">
      <!-- STUB COLORS -->
      <div class="mb-1 col-6"> <!--BG COLOR-->
        <small><i class="mdi mdi-palette"></i></small>
        <input type="color" class="form-control" :style="`background-color: ${theme.background}`"
          v-model="theme.background">
      </div>
      <div class="mb-1 col-6"> <!--BG ACCENT COLOR-->
        <small><i class="mdi mdi-palette"></i></small>
        <input type="color" class="form-control" :style="`background-color: ${theme.backgroundAccent}`"
          v-model="theme.backgroundAccent">
      </div>
      <div class="mb-1 col-4"> <!--PRIMARY COLOR-->
        <small><i class="mdi mdi-palette"></i></small>
        <input type="color" class="form-control" :style="`background-color: ${theme.primaryColor}`"
          v-model="theme.primaryColor">
      </div>
      <div class="mb-1 col-4"> <!--SECONDARY COLOR-->
        <small><i class="mdi mdi-palette"></i></small>
        <input type="color" class="form-control" :style="`background-color: ${theme.secondaryColor}`"
          v-model="theme.secondaryColor">
      </div>
      <div class="mb-1 col-4"> <!--ACCENT COLOR-->
        <small><i class="mdi mdi-palette"></i></small>
        <input type="color" class="form-control" :style="`background-color: ${theme.accentColor}`"
          v-model="theme.accentColor">
      </div>
      <!-- STUB GUTTER AND GAP -->
      <div class="mb-1 col-4"> <!--GUTTER SIZE-->
        <small><i class="mdi mdi-align-horizontal-distribute"></i> gutter {{ theme.gutter }}</small>
        <input type="range" step="1" max="15" class="form-control" v-model="theme.gutter">
      </div>
      <div class="mb-1 col-4"> <!--GAP SIZE-->
        <small><i class="mdi mdi-border-inside"></i> gap {{ theme.gap }}</small>
        <input type="range" step="1" max="50" class="form-control" v-model="theme.gap">
      </div>
      <div class="mb-1 col-4"> <!--COLUMN COUNT SIZE-->
        <small><i class="mdi mdi-table-row"></i> columns {{ theme.columns }}</small>
        <input type="range" step="1" min="1" max="12" class="form-control" v-model="theme.columns">
      </div>


      <!-- STUB CARDS -->
      <div class="mb-1 col-4"> <!--CARD STYLE-->
        <small><i class="mdi mdi-view-dashboard"></i> layout</small>
        <select class="form-control h-50 p-1 pt-0" v-model="theme.layout">
          <option value="squares">grid</option>
          <option value="columns">columns</option>
        </select>
      </div>
      <div class="mb-1 col-4"> <!--CARD STYLE-->
        <small><i class="mdi mdi-image"></i> card style</small>
        <select class="form-control h-50 p-1 pt-0" v-model="theme.card">
          <option value="sharp">arty square</option>
          <option value="card">info card</option>
        </select>
      </div>
      <div class="mb-1 col-4"> <!--BORDER RADIUS-->
        <small><i class="mdi mdi-border-radius"></i> corners {{ theme.cardBorder }}</small>
        <input type="range" step="1" min="1" max="20" class="form-control" v-model="theme.cardBorder">
      </div>

      <button class="col-12 btn selectable text-light">save <i class="mdi mdi-floppy"></i></button>
    </form>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
const theme = computed(() => AppState.artist?.theme)


async function saveTheme() {
  try {
    await accountService.saveTheme()
    Pop.toast('Theme updated', 'success', 'top')
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<style lang="scss" scoped>
.edit-window {
  background: rgba(32, 32, 32, 0.651);
  backdrop-filter: blur(10px);
  padding: .5em;
  height: 40vh;
  width: 25vw;
}

small {
  opacity: .7;
}
</style>
