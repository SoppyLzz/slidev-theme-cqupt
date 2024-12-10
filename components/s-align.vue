<template>
  <div :class="clses.container"><div :class="clses.inner"><slot name="default"/></div></div>
</template>

<script lang="ts" setup>
import type {SAlign, SDirection} from "../const";
import {computed} from "vue";

interface AlignProps {
  align: SAlign;
  direction: SDirection;
}
const props = withDefaults(defineProps<AlignProps>(), {
  align: "start",
  direction: "horizontal",
})

const clses = computed(() => {
  const _align_token = {
    "start": props.direction === "horizontal"? "r" : "b",
    "center": props.direction === "horizontal"? "x" : "y",
    "end": props.direction === "horizontal"? "l" : "t",
  }
  const containerCls = {
    "vertical": ['flex', 'flex-col', 'h-full'],
    "horizontal": ['flex', 'flex-row', 'w-full']
  }
  const innerCls = {
    "vertical": ['w-full', 'h-fit',`m${_align_token[props.align]}-auto`],
    "horizontal": ['h-full', 'w-fit',`m${_align_token[props.align]}-auto`]
  }

  return {
    container: containerCls[props.direction],
    inner: innerCls[props.direction]
  }
})
</script>