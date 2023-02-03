<template>
  <div class="project-card">
    <router-link :to="{ params: { gallery: projectGallery.name }, query: { project: project.name } }" class="img-fit">
      <BImage :image="bi" v-if="project.coverBlur" />
      <img :src="project.coverImg" v-else alt="">
    </router-link>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, defineProps } from 'vue';
const props = defineProps({ project: { type: Object } })
const projectGallery = computed(() => AppState.galleries.find(g => g.id == props.project.galleryId))
const bi = computed(() => {
  return {
    imgUrl: props.project.coverImg,
    blurHash: props.project.coverBlur,
    height: 500,
    width: 500,
    id: props.project.id
  }
}
)
</script>


<style lang="scss" scoped>
.project-card {
  padding: 0;
  width: 50%;
  aspect-ratio: 1/1;
  overflow: hidden;
}

.img-fit {

  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>
