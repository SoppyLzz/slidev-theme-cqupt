<template>
  <div class="flex flex-col mx-4 my-2 w-[calc(100%-2rem)] shadow-md s-bg-base">
    <div class="flex flex-row items-center px-3 py-1 s-color-base" :style="headerStyle">
      <component v-if="props.icon" :is="props.icon" class="s-icon-lg fill-[var(--s-light-8)] mr-2" />
      <span class="flex-1 text-md text-[var(--s-light-8)]">
        <template v-if="$slots.title"><slot name="title"/></template>
        <template v-else-if="props.header">{{props.header}}</template>
      </span>
    </div>
    <div class="flex-1 p-3 s-color-fade"><slot name="default"></slot></div>
  </div>
</template>
<script lang="ts" setup>
import {computed} from "vue";
import type {SType} from "../const";

interface CardProps {
  header?:string;
  icon?: string;
  type?: SType;
}
const props = withDefaults(defineProps<CardProps>(), {
  icon: "SiBook",
  type: "primary",
})

const headerStyle = computed(() => ({'background-color': `var(--s-${props.type})`}))
</script>