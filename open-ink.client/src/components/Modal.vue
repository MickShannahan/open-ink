<template>

  <!-- Modal -->
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>




</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';

</script>


<style lang="scss" scoped>
.modal-content {
  background-color: rgb(29, 29, 29);
}
</style>
