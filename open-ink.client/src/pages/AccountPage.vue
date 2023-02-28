<template>
  <div class="container-fluid height-screen pt-5 align-items-center themeless">
    <section class="row justify-content-around px-5">
      <!-- STUB FORM CARD -->
      <form class="col-12 col-md-5 text-dark bg-light rounded elevation-3 p-3" @submit.prevent="updateAccount">
        <div class="row justify-content-center">

          <!-- <div class="col-md-10 col-lg-8 account-cover rounded">
            <img :src="editable.cover" class="rounded" alt="">
            <UploadButton id="cover" @uploading="loadCover" :options="{ required: false }" class="upload-cover on-hover" />
          </div> -->
          <small id="helpId" class="form-text text-muted">{{ editable.email }}</small>
          <div class="my-3 col-8 text-center picture-wrapper rounded ">
            <img class="account-picture elevation-3" :src="editable.picture" alt="">
            <UploadButton id="picture" @uploading="loadImage" :options="{ required: false }"
              class="upload-account on-hover" />
            <h5 v-if="editable.displayName == 'username'" class=" my-1"><b>{{ editable.username }}</b></h5>
            <h5 v-else class=" my-1"><b>{{ editable.name }}</b></h5>
            <div>
              <small v-if="editable.bio">{{ editable.bio }}&ThickSpace;</small><small v-if="editable.location"><i
                  class="mdi mdi-map-marker"></i>{{
                    editable.location
                  }}</small>
            </div>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Name</label>
            <input type="text" required v-model="editable.name" class="form-control" name="name" aria-describedby="helpId"
              placeholder="" minlength="3" maxlength="25">
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Username</label>
            <input type="text" required minLength="3" maxLength="15" v-model="editable.username" class="form-control"
              name="username" aria-describedby="helpId" placeholder="" @keyup="checkUsername">
            <small v-if="badName.length && badName != account.username" class="form-text text-danger">{{ badName }} is
              already taken</small>
            <small v-else id="helpId" class="form-text text-muted"
              v-tooltip="'this username is available'">https://open-ink.art/{{ editable.username }} <i
                class="mdi mdi-check text-success darken-10"></i></small>
          </div>
          <div class="mb-3">
            <label for="displayName">display on profile</label>
            <div class="d-flex">
              <div class="form-check me-5">
                <small>name</small>
                <input type="radio" class="form-check-input" name="displayName" v-model="editable.displayName"
                  value="name">
              </div>
              <div class="form-check">
                <small>username</small>
                <input type="radio" class="form-check-input" name="displayName" v-model="editable.displayName"
                  value="username">
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">bio</label>
            <input type="text" v-model="editable.bio" class="form-control" name="bio" aria-describedby="helpId"
              placeholder="Digital artist" minlength="0" maxlength="30">
          </div>
          <div class="mb-3">
            <label for="" class="form-label">location</label>
            <input type="text" v-model="editable.location" class="form-control" name="location" aria-describedby="helpId"
              placeholder="nowhere, usa" minlength="0" maxlength="25">
          </div>
          <input v-show="false" type="checkbox" :required="!ready">
          <div class="col-12">
            <button class="btn-theme text-info w-100" :disabled="!ready || badName.length">save <i
                class="mdi mdi-account"></i></button>
          </div>
        </div>
      </form>
      <div class="col-12 col-md-7 px-0 px-md-4 mt-3 mt-md-0">
        <!-- STUB Account Limits -->
        <div class="text-dark bg-light rounded elevation-3 p-3 mb-3">
          <AccountLimitsCard v-if="account.id" />
        </div>
        <!-- STUB Invites -->
        <div class="text-dark bg-light rounded elevation-3 p-3">
          <InvitesComponent v-if="account.id" />
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import UploadButton from '../components/UploadButton.vue';
import { blobsService } from '../services/BlobService.js';
import { artistsService } from '../services/ArtistsService.js';
import _ from 'lodash'
import { logger } from '../utils/Logger.js';
const editable = ref({})
const account = computed(() => AppState.account)
const needUpload = ref(null)
const uploading = ref(false)
const ready = ref(true)
const badName = ref('')
watchEffect(() => {
  editable.value = { ...account.value }
})


function loadImage(payload, prop = 'picture') {
  editable.value[prop] = payload.url
  needUpload.value = payload.file
}

function loadCover(payload, id) {
  logger.log('uploading cover', payload, id)
  editable.value.cover = payload.url
  needUpload.value.cover = payload.file

}


async function checkUsername() {
  try {
    let artist = await artistsService.checkUsername(editable.value.username)
    badName.value = artist.username
  } catch (error) {
    badName.value = ''
  }
}
async function getAccount() {

}

async function updateAccount() {
  try {
    if (needUpload.value) {
      let uploaded = await blobsService.upload(needUpload.value, account.value.id, 'profile-picture')
      editable.value.picture = uploaded.smallUrl + `?picture=${Math.floor(Math.random() * 100)}`
    }
    await accountService.update(editable.value)
    Pop.toast('Profile Updated', 'success', 'top')
  } catch (error) {
    Pop.error(error)
  }
}
</script>

<style scoped lang="scss">
form {
  max-width: 600px;
}

.picture-wrapper {
  position: relative;
  display: block;
}

.account-picture {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.account-cover {
  position: absolute;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }
}

.upload-account,
.upload-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
