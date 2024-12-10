<template>
  <div class="absolute top-0 left-0 w-full h-full p-0">
    <img :src="props.src" class="relative w-full h-full object-cover"/>
    <div class="absolute top-0 left-0 w-full h-full z-auto" :class="props.backdrop"></div>
  </div>
</template>

<script lang="ts" setup>
interface PictureProps {
  src: string;
  backdrop: string | string[];
}

const props = withDefaults(defineProps<PictureProps>(), {})
</script>