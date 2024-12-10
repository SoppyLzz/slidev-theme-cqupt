<template>
  <div class="slidev-layout cols flex flex-row">
    <div class="flex flex-col w-full">
      <div v-if="$slots.default"><slot name="default"/></div>
      <div v-if="$slots.col_1 || $slots.col_2 || $slots.col_3" :class="colsCls"
           class="flex-1 overflow-hidden flex flex-row gap-4">
        <div :class="colCls" v-if="$slots.col_1"><slot name="col_1"/></div>
        <div :class="colCls" v-if="$slots.col_2"><slot name="col_2"/></div>
        <div :class="colCls" v-if="$slots.col_3"><slot name="col_3"/></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, useSlots} from "vue";
import {useFrontMatter} from "../hooks";

const slots = useSlots()
const {frontMatter} = useFrontMatter()

const colsCls = computed(() => {
  return slots.default ? ['mt-4'] : []
})
const colCls = computed(() => {
  const pubCls = ['flex-1', 's-scrollbar']
  const clses = {
    "hidden": ['overflow-hidden'],
    "scroll": ['overflow-scroll'],
    "auto": ['overflow-auto'],
  }
  return [
      ...pubCls,
      ...clses[frontMatter.value?.cols?.overflow],
  ] || []
})
</script>