<template>
  <div class="project-card">
    {{ project.name }}
  </div>
</template>


<script setup>
const props = defineProps({ project: { type: Object, required: true } })
</script>


<style lang="scss" scoped>
.project-card {
  border: 1px solid;
  aspect-ratio: 1/1;
}
</style>
