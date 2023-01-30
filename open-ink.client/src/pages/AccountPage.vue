<template>
  <div class="container d-flex flex-column pt-5 align-items-center">
    <form class="row text-light justify-content-center" @submit.prevent="updateAccount">
      <div class="mb-3 col-6 text-center">
        <img :src="editable.picture" alt="">
        <UploadButton @uploading="loadImage" :options="{ required: false }" />
        <small id="helpId" class="form-text text-muted">{{ editable.email }}</small>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">Name</label>
        <input type="text" required v-model="editable.name" class="form-control" name="name" aria-describedby="helpId"
          placeholder="">
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
        <input type="text" v-model="editable.location" class="form-control" name="location" aria-describedby="helpId"
          placeholder="nowhere, usa">
      </div>
      <input v-show="false" type="checkbox" :required="!ready">
      <div class="col-12">
        <button class="btn btn-primary w-100" :disabled="!ready || badName.length">save</button>
      </div>
    </form>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
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
onMounted(() => {
  editable.value = { ...account.value }
})

function loadImage(payload) {
  editable.value.picture = payload.url
  needUpload.value = payload.file
}


async function checkUsername() {
  try {
    let artist = await artistsService.checkUsername(editable.value.username)
    badName.value = artist.username
  } catch (error) {
    badName.value = ''
  }
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

<style scoped>
form {
  max-width: 600px;
}

img {
  max-width: 200px;
  border-radius: 8px;
}
</style>
