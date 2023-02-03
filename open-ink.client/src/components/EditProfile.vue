<template>
  <div class="d-flex flex-column align-items-end">
    <div id="edit-window" class="ui-border edit-window rounded elevation-2 my-1 container-fluid align-items-between"
      :class="{ open }">
      <form @submit.prevent="saveTheme" class="d-flex flex-wrap text-light align-items-between justify-content-center">
        <!-- STUB COLORS -->
        <div class="mb-1 col-6"> <!--BG COLOR-->
          <small><i class="mdi mdi-palette pe-2"></i></small>
          <small @click="theme.backgroundType = 'gradient'" class="selectable px-2 rounded"><i
              class="mdi mdi-gradient-horizontal"></i></small>
          <small @click="theme.backgroundType = 'fill'" class="selectable px-2 rounded"><i
              class="mdi mdi-square"></i></small>
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
        <div class="mb-1 col-6 col-md-4"> <!--GUTTER SIZE-->
          <small><i class="mdi mdi-align-horizontal-distribute"></i> gutter {{ theme.gutter }}</small>
          <input type="range" step="1" max="15" class="form-control range" v-model="theme.gutter">
        </div>
        <div class="mb-1 col-6 col-md-4"> <!--GAP SIZE-->
          <small><i class="mdi mdi-border-inside"></i> gap {{ theme.gap }}</small>
          <input type="range" step="1" max="50" class="form-control range" v-model="theme.gap">
        </div>
        <div class="mb-1 col-6 col-md-4"> <!--COLUMN COUNT SIZE-->
          <small><i class="mdi mdi-table-row"></i> w {{ theme.columns }}</small>
          <input type="range" step="25" min="150" max="500" class="form-control range" v-model="theme.columns">
        </div>


        <!-- STUB CARDS -->
        <div class="mb-1 col-6 col-md-4"> <!--CARD STYLE-->
          <small><i class="mdi mdi-view-dashboard"></i> layout</small>
          <select class="form-control h-50 p-1 pt-0" v-model="theme.layout">
            <option value="squares">grid</option>
            <option value="columns">columns</option>
          </select>
        </div>
        <div class="mb-1 col-6 col-md-4"> <!--CARD STYLE-->
          <small><i class="mdi mdi-image"></i> card style</small>
          <select class="form-control h-50 p-1 pt-0" v-model="theme.card">
            <option value="sharp">arty square</option>
            <option value="card">info card</option>
          </select>
        </div>
        <div class="mb-1 col-6 col-md-4"> <!--BORDER RADIUS-->
          <small><i class="mdi mdi-border-radius"></i> corners {{ theme.cardBorder }}</small>
          <input type="range" step="1" min="1" max="20" class="form-control range" v-model="theme.cardBorder">
        </div>


        <!-- STUB FONTS -->
        <div class="mb-1 col-6 col-md-5"> <!--FONT HEADINGS-->
          <small><i class="mdi mdi-format-font"></i> headings</small>
          <select class="form-control h-50 p-1 pt-0" v-model="theme.fontHeading">
            <option value="'Bungee', cursive">bungee</option>
            <option value="'Bungee Hairline', cursive">hairline</option>
            <option value="'Fredoka One', cursive">fredoka</option>
            <option value="Major Mono Display', monospace">Major Mono</option>
            <option value="'Montserrat Alternates', sans-serif">montserrat alt</option>
            <option value="'Rozha One', serif">rozha</option>
            <option value="'Yeseva One', cursive">yeseva</option>
          </select>
        </div>
        <div class="mb-1 col-6 col-md-5"> <!--FONT HEADINGS-->
          <small><i class="mdi mdi-format-font"></i> bodies</small>
          <select class="form-control h-50 p-1 pt-0" v-model="theme.fontBody">
            <option value="Nunito', sans-serif">nunito</option>
            <option value="'Roboto', sans-serif">roboto</option>
            <option value="'Roboto Slab', serif">slab</option>
            <option value="'Space Mono', monospace">mono</option>
            <option value="'Montserrat', sans-serif">montserrat</option>
          </select>
        </div>
        <div class="mb-1 col-6 col-md-2"> <!--BORDER RADIUS-->
          <small><i class="mdi mdi-palette"></i><i class="mdi mdi-alpha-a"></i></small>
          <input type="color" class="form-control" :style="`background-color: ${theme.fontColor}`"
            v-model="theme.fontColor">
        </div>

        <!-- STUB SAVE BUTTONS -->

        <button @click="changeDisplay" class="col-6 col-md-12 btn selectable text-light"
          :class="{ 'btn-light text-dark': mobileDisplay }" type="button">mobile <i
            class="mdi mdi-cellphone-link"></i></button>
        <button class="col-6 col-md-12 btn selectable text-light">save <i class="mdi mdi-floppy"></i></button>
      </form>
    </div>
    <button v-if="!open" class="btn ui-border mb-2 collapse-btn selectable text-secondary rounded-circle"
      @click="open = true"><i class="mdi mdi-dots-horizontal"></i></button>
    <button v-else class="btn ui-border mb-2 collapse-btn selectable text-secondary rounded-circle"
      @click="open = false"><i class="mdi mdi-eye-remove"></i></button>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
const theme = computed(() => AppState.artist?.theme)
const open = ref(false)
function changeDisplay() {
  logger.log('changing mobile', AppState.mobileDisplay)
  AppState.mobileDisplay = !AppState.mobileDisplay
}
const mobileDisplay = computed(() => AppState.mobileDisplay)


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
  height: 0px;
  width: 0px;
  transform: scale(0);
  font-size: 14px;
  transform-origin: bottom right;
}

.edit-window.open {
  transition: all .3s ease;
  min-height: 40vh;
  display: flex;
  transform: scale(1);
  width: auto;

  form {
    max-width: 450px;
  }
}




.collapse-btn {
  height: 50px;
  width: 50px;
}

small {
  opacity: .7;
}

input.range {
  background-color: rgba(128, 128, 128, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.25);
}
</style>
