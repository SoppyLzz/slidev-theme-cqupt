<template>
  <div class="slidev-layout toc flex flex-row justify-center items-center">
    <div :style="circleOuterStyle" class="relative rounded-full flex items-center justify-center border border-dashed s-border-base">
      <div :style="circleStyle"
           class="rounded-full flex flex-col items-center justify-center border s-border-fade s-bg-fade shadow-md">
        <slot name="default"></slot>
      </div>

      <div v-for="(item, index) in sectionList" :key="index" :style="computeStyle(index)" class="absolute -ml-6 -mt-6 flex flex-row items-center">
        <span class="rounded-full w-12 h-12 mr-4 flex flex-row items-center justify-center border border-[var(--s-line-fade)] s-bg-fade shadow-md">{{arabic2Chinese(index+1)}}</span>
        <Link class="text-nowrap" :to="item.no">{{item.name}}</Link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useFrontMatter, useSections} from "../hooks";
import {arabic2Chinese} from "../utils";
import {computed, ref, watchEffect} from "vue";

const {sections} = useSections()
const {frontMatter} = useFrontMatter()

const r = ref(10)

watchEffect(() => {
  r.value = frontMatter.value?.toc?.r || 12
})

const sectionList = computed(() => {
  return sections.length == 0? [{name: "请添加 section"}] : sections
})

const computeStyle = (index) => {
  const theta = ((index+1)/(sectionList.value.length+1)) * Math.PI
  return {
    top: `${r.value - Math.cos(theta) * r.value}rem`,
    left: `${r.value + Math.sin(theta) * r.value}rem`,
  }
}
const circleOuterStyle = computed(() => ({width: `${2*r.value}rem`, height: `${2*r.value}rem`, marginLeft: `-${r.value}rem`}))
const circleStyle = computed(() => ({width: `${1.6*r.value}rem`, height: `${1.6*r.value}rem`}))
</script>