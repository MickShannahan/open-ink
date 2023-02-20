<template>
  <div class="container-fluid height-screen pt-5 align-items-center themeless">
    <section class="row px-5">
      <!-- STUB FORM CARD -->
      <form class="col-6 text-theme-color bg-bg rounded elevation-3" @submit.prevent="updateAccount">
        <div class="row justify-content-center">

          <!-- <div class="col-md-10 col-lg-8 account-cover rounded">
            <img :src="editable.cover" class="rounded" alt="">
            <UploadButton id="cover" @uploading="loadCover" :options="{ required: false }" class="upload-cover on-hover" />
          </div> -->
          <div class="mb-3 mt-5 col-6 text-center picture-wrapper bg-bg rounded elevation-3">
            <img class="account-picture elevation-3" :src="editable.picture" alt="">
            <UploadButton id="picture" @uploading="loadImage" :options="{ required: false }"
              class="upload-account on-hover" />
            <small id="helpId" class="form-text text-muted">{{ editable.email }}</small>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Name</label>
            <input type="text" required v-model="editable.name" class="form-control" name="name"
              aria-describedby="helpId" placeholder="">
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Username</label>
            <input type="text" required minLength="3" maxLength="15" v-model="editable.username" class="form-control"
              name="username" aria-describedby="helpId" placeholder="" @keyup="checkUsername">
            <small v-if="badName.length && badName != account.username" class="form-text text-danger">{{ badName }} is
              already taken</small>
            <small v-else id="helpId" class="form-text text-muted">https://open-ink.art/{{ editable.username }} <i
                class="mdi mdi-check"></i></small>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">bio</label>
            <input type="text" v-model="editable.bio" class="form-control" name="bio" aria-describedby="helpId"
              placeholder="Digital artist">
          </div>
          <div class="mb-3">
            <label for="" class="form-label">location</label>
            <input type="text" v-model="editable.location" class="form-control" name="location"
              aria-describedby="helpId" placeholder="nowhere, usa">
          </div>
          <input v-show="false" type="checkbox" :required="!ready">
          <div class="col-12">
            <button class=" btn-primary w-100" :disabled="!ready || badName.length">save</button>
          </div>
        </div>
      </form>
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
const needUpload = ref({})
const uploading = ref(false)
const ready = ref(true)
const badName = ref('')
watchEffect(() => {
  editable.value = { ...account.value }
  editable.value.cover = account.value.theme?.cover
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
      let uploaded = await blobsService.upload(needUpload.value, account.id, 'profile-picture')
      editable.value.picture = uploaded.smallUrl
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
}

.account-picture {
  width: 200px;
  height: 200px;
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
