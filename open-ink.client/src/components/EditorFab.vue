<template>
  <div class="fab-container d-flex flex-column">
    <div class="fab-wrapper">
      <!-- SECTION create fab -->
      <CreateFab />
      <CreateGalleryModal />
      <CreateProjectModal />
      <EditProfile />
      <!-- SECTION account logged -->
      <div class="d-flex justify-content-end">
        <div id="account-collapse" class="collapse collapse-horizontal">
          <div class="d-flex">
            <button class="btn rounded-pill text-danger selectable" @click="logout">
              <span>logout</span><i class="mdi mdi-logout"></i>
            </button>
            <router-link :to="{ name: 'Account' }" class="btn rounded-pill text-info lighten-20 selectable">
              <span>edit account</span><i class="mdi mdi-account"></i>
            </router-link>
            <router-link :to="{ name: 'Artist', params: { artist: account.username } }"
              class="btn rounded-pill text-primary  selectable">
              <span>My Profile</span><i class="mdi mdi-land-plots"></i>
            </router-link>
          </div>
        </div>
        <img class="account-picture selectable" data-bs-toggle="collapse" data-bs-target="#account-collapse"
          :src="account.picture" alt="">
      </div>
    </div>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { AuthService } from '../services/AuthService.js';
const account = computed(() => AppState.account)

function logout() {
  AuthService.logout()
}

</script>


<style lang="scss" scoped>
.fab-container {
  position: fixed;
  bottom: 1.5em;
  right: 1.5em;

  .fab-wrapper {
    position: relative;
  }
}

.account-picture {
  width: 50px;
  height: 50px;
  border-radius: 50em;
}
</style>
