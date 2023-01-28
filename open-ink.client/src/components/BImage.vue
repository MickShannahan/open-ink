<template>
  <div class="responsive">
    <div class="wrapper">
      <canvas :id="'i' + image.id"></canvas>
      <img :src="image.imgUrl" alt="" @load="load" :class="{ fade: loaded }" :height="image.height"
        :width="image.width">
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import { blurService } from '../services/BlurService.js'
export default {
  props: { image: { type: Object, required: true } },
  setup(props) {
    const loaded = ref(false)
    function hash() {
      const img = props.image
      const w = Math.round(img.width * .1)
      const h = Math.round(img.height * .1)
      const canvas = document.querySelector('#i' + img.id);
      canvas.width = w
      canvas.height = h
      blurService.hash(canvas, img.blurHash, w, h)
      // canvas.width = img.width
      // canvas.height = img.height
    }
    onMounted(() => {
      hash()
      logger.log('bimage loaded')
    })
    return {
      loaded,
      aspectRatio: computed(() => `${props.image.width}/${props.image.height}`),
      load() {
        setTimeout(() => loaded.value = true, 20)
      }
    }
  }
};
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
    max-height: 95vh;
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
