<template>
  <div class="w-full h-full flex">
    <div ref="container" class="w-full max-h-full flex flex-col items-center" :class="picCls">
      <img ref="img" class="object-contain w-full flex-1"
           :alt="`${props.intro}-img`" :style="picStyle" :src="props.src"/>
      <p ref="intro" class="pt-2">{{props.intro}}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import type {SAlign} from "../const";

interface ImageProps {
  align: SAlign;
  intro: string;
  src: string;
}

const props = withDefaults(defineProps<ImageProps>(), {
  align: "start",
  intro: 'Add img introduction',
  src: 'https://cover.sli.dev',
})

const img = ref<HTMLElement | null>(null)
const intro = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)

// bullshit, is there better solution?
const picStyle = computed(() => {
  const imgHeight = img.value?.clientHeight
  const introHeight = intro.value?.clientHeight
  const containerHeight = container.value?.clientHeight

  if (imgHeight + introHeight > containerHeight) {
    return {height: `${containerHeight - introHeight}px`}
  }
  return {height: `${imgHeight}px`}
})
const picCls = computed(() => {
  const clses = {
    "start": ['mb-auto'],
    "center": ['my-auto'],
    "end": ['mt-auto'],
  }

  return clses[props.align] || []
})
</script>
