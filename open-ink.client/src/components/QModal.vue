<template>

  <!-- Modal -->
  <div class="modal fade" tabindex="-1" role="dialog" @click.stop="" aria-labelledby="modalTitleId" aria-hidden="true">
    <div :class="`modal-dialog modal-dialog-centered ${size}`" role="document">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>




</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
const props = defineProps({ size: { type: String, required: false, default: 'modal-lg' } })

</script>


<style lang="scss" scoped>
.modal-content {
  background-color: rgb(29, 29, 29);
  z-index: 1000000;
  box-shadow: 0px 0px 25px 105vw rgba(0, 0, 0, 0.74);
}

div.modal-backdrop.fade.show {
  background-color: transparent !important;

}
</style>
