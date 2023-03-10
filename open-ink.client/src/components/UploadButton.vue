<template>
  <div class="load-wrapper">
    <div id="file-drop"
      class="d-flex drop-zone flex-column justify-content-center align-items-center rounded my-2 selectable no-select"
      :class="{ hovering }" @drop="dropFiles" @dragover.prevent="dragFiles" @dragleave="hovering = false"
      :accept="options.accept" @click="selectFiles">
      <i class="mdi mdi-file-plus"></i>
      <small>drag and drop files here</small>
    </div>
    <input name="file" id="file-input" type="file" multiple="true" :required="options.require" :class="options.class"
      :placeholder="options.placeholder" @change="fileUpload">
    <div v-if="uploading" class="loading">{{ options.spinner }}</div>
    <input v-show="false" type="checkbox" :required="!complete && options.require">
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { blobsService } from '../services/BlobService.js';
export default {
  props: {
    id: String,
    options: {
      type: Object, required: false, default: {
        require: true,
        multiple: false,
        class: 'form-control btn btn-primary',
        placeholder: 'pick a file',
        spinner: '🧇',
        accept: 'image/*'
      }
    }
  },
  setup(props, { emit }) {
    const uploading = ref(false)
    const complete = ref(false)
    const hovering = ref(false)
    const files = ref([])
    function bundle(file) {
      const payload = {}
      const url = URL.createObjectURL(file)
      payload.url = url
      payload.file = file
      emit('uploading', payload, props.id)
      setTimeout(() => {
        // URL.revokeObjectURL(url)
      }, 1000)
    }
    return {
      uploading,
      complete,
      hovering,
      async dropFiles(ev) {
        logger.log('File(s) dropped');
        uploading.value = true
        hovering.value = false
        complete.value = false
        files.value = []

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        if (ev.dataTransfer.items) {
          // Use DataTransferItemList interface to access the file(s)
          [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items aren't files, reject them
            if (item.kind === 'file') {
              const file = item.getAsFile();
              files.value.push(file)
              bundle(file)
              logger.log(`… file[${i}].name = ${file.name}`);
            }
          });
        } else {
          // Use DataTransfer interface to access the file(s)
          [...ev.dataTransfer.files].forEach((file, i) => {
            logger.log(`… file[${i}].name = ${file.name}`);
          });

        }
        uploading.value = false
        complete.value = true
      },
      async dragFiles(ev) {
        logger.log('dragging')
        hovering.value = true
      },
      async fileUpload(ev) {
        logger.log('File(s) selected');
        uploading.value = true
        hovering.value = false
        complete.value = false
        files.value = []
        let input = ev.target
        logger.log(input.files)

        if (input.files) {
          [...input.files].forEach((file, i) => {
            files.value.push(file)
            bundle(file)
            logger.log(`… file[${i}].name = ${file.name}`);

            uploading.value = false
            complete.value = true
          })
        }
      },
      selectFiles() {
        document.querySelector('#file-input').click()
      }
    }
  }
};
</script>


<style lang="scss" scoped>
#file-input {
  height: 0px;
  width: 0px;
  position: fixed;
  opacity: 0;
}

.load-wrapper {
  position: relative;
}

.drop-zone {
  min-height: 15vh;
  border: dashed rgba(255, 255, 255, 0.5) 3px;
}

.hovering {

  background-color: #ffffff5b;
  color: var(--bs-primary);
}

.loading {
  width: 2em;
  height: 2em;
  text-align: center;
  transform-origin: center;
  animation: loading 5s linear infinite;
  position: absolute;
  top: 0;
  right: 0;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(3600deg);
  }
}
</style>
