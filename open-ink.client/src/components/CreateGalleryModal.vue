<template>
  <QModal :id="id" class="container-fluid">
    <div class="row justify-content-between text-light p-3">
      <div class="col-11 pb-2 border-bottom border-dark">
        <div>Create Gallery</div>
      </div>
      <div class="col-1 text-end border-bottom border-dark">
        <button class="btn selectable text-light">
          <i class="mdi mdi-close" data-bs-dismiss="modal"></i>
        </button>
      </div>
      <!-- form -->
      <form @submit.prevent="handleSubmit()">
        <div class="col-12 my-2">
          <label for="" class="form-label">Name</label>
          <input type="text" v-model="gallery.name" class="form-control" name="" id="" aria-describedby="helpId"
            placeholder="Gallery Name" required>
        </div>
        <div class="col-12 my-2">
          <div class="form-check form-switch justify-content-end">
            <input type="checkbox" v-model="gallery.published" class="form-check-input" checked role="switch"
              id="flexSwitchCheckDefault">
            <div class="form-check-label" for="flexSwitchCheckDefault">Published</div>
            <small>only published Galleries will visible to visitors</small>
          </div>
        </div>
        <div class="col-12 my-2">
          <div class="form-check form-switch justify-content-end">
            <input type="checkbox" v-model="gallery.nsfw" class="form-check-input" role="switch"
              id="flexSwitchCheckDefault">
            <div class="form-check-label" for="flexSwitchCheckDefault">Not Safe For Work</div>
            <small>Galleries marked NSFW will be prompted with an age gate before entering</small>
          </div>
        </div>
        <div class="col-12 my-2 text-end">
          <button class=" text-light mx-3 selectable" type="button">cancel</button>
          <button class=" btn-info">Create</button>
        </div>
      </form>
    </div>
  </QModal>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { galleriesService } from '../services/GalleriesService.js';
import { useRouter } from 'vue-router';
const props = defineProps({ galleryData: { type: Object, required: false }, id: String })
const router = useRouter()
const gallery = ref({})

watchEffect(() => {
  gallery.value = { ...props.galleryData }
})

function handleSubmit() {
  if (props.galleryData) {
    updateGallery()
  } else {
    createGallery()
  }
}

async function createGallery() {
  try {
    let gal = await galleriesService.createGallery(gallery.value)
    Pop.toast(`${gal.name} created!`, 'success', 'top')
    gallery.value = {}
    Modal.getOrCreateInstance('#' + props.id).hide()
    router.push({ name: 'Gallery', params: { gallery: gal.name } })
  } catch (error) {
    Pop.error(error)
  }
}

async function updateGallery() {
  try {
    const gal = await galleriesService.update(gallery.value)
    router.push({ name: 'Gallery', params: { gallery: gal.name } })
    Pop.toast(`updated ${gallery.value.name}`)
  } catch (error) {
    Pop.error(error)
  }
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
