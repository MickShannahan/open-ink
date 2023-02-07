<template>
  <div class="responsive">
    <div class="wrapper">
      <canvas :id="'i' + image.id"></canvas>
      <img loading="lazy" :src="image.imgUrl" alt="" @load="loadedImage" :class="{ fade: loaded }"
        :height="image.height" :width="image.width">
    </div>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import { blurService } from '../services/BlurService.js'
const props = defineProps({ image: { type: Object, required: true } })
const loaded = ref(false)
const mounted = ref(false)
function hash() {
  logger.log('getting blur', props.image.fileName)
  const img = props.image
  const w = Math.round(img.width * .1)
  const h = Math.round(img.height * .1)
  const canvas = document.querySelector('#i' + img.id);
  canvas.width = w
  canvas.height = h
  blurService.hash(canvas, img.blurHash, w, h)
  logger.log('finished blur', props.image.fileName)
}
onMounted(() => {
  console.log('- loaded -', mounted.value, props.image.fileName)
  hash()
})
const aspectRatio = computed(() => `${props.image.width}/${props.image.height}`)
function loadedImage() {
  logger.log('! img loaded !', props.image.fileName)
  setTimeout(() => loaded.value = true, 20)
}
</script>


<style lang="scss" scoped>
.responsive {
  // overflow: hidden;
  // height: 100%;
  // width: 100%;
  object-fit: contain;
  position: relative;
  // background-color: rgba(255, 255, 255, 0.089);
}

.wrapper {
  display: flex;
  justify-content: center;
  // overflow: hidden;
  height: 100%;
  // width: 100%;
  object-fit: contain;

  canvas {
    height: 100%;
    // width: 100%;
    max-height: 90vh;
    opacity: 100%;
    position: absolute;
    aspect-ratio: v-bind(aspectRatio);
  }

  // img {
  //   position: absolute;
  // }
}

img {
  height: 100%;
  max-height: 95vh;
  width: 100%;
  object-fit: contain;
  opacity: 0;
}

.fade {
  animation: reveal .15s forwards;
}

@keyframes reveal {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
