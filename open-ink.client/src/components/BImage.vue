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
      const w = img.width * .1
      const h = img.height * .1
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
      load() {
        setTimeout(() => loaded.value = true, 20)
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.responsive {
  overflow: hidden;
  // height: 100%;
  // width: 100%;
  object-fit: cover;
  position: relative;
  background-color: rgba(255, 255, 255, 0.089);
}

.wrapper {
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  object-fit: cover;

  canvas {
    height: 100%;
    width: 100%;
    opacity: 100%;
    position: absolute;
  }

  // img {
  //   position: absolute;
  // }
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
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
