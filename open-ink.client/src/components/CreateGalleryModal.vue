<template>
  <Modal id="create-gallery" class="container-fluid">
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
      <form action="">
        <div class="col-12 my-2">
          <label for="" class="form-label">Name</label>
          <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Gallery Name"
            required>
        </div>
        <div class="col-12 my-2">
          <div class="form-check form-switch justify-content-end">
            <input class="form-check-input" type="checkbox" checked role="switch" id="flexSwitchCheckDefault">
            <div class="form-check-label" for="flexSwitchCheckDefault">Published</div>
            <small>only published Galleries will visible to visitors</small>
          </div>
        </div>
        <div class="col-12 my-2">
          <div class="form-check form-switch justify-content-end">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <div class="form-check-label" for="flexSwitchCheckDefault">Not Safe For Work</div>
            <small>Galleries marked NSFW will be prompted with an age gate before entering</small>
          </div>
        </div>
        <div class="col-12 my-2 text-end">
          <button class="btn text-light mx-3 selectable">cancel</button>
          <button class="btn btn-info">Create</button>
        </div>
      </form>
    </div>
  </Modal>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';

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
