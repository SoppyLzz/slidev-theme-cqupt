<template>
  <div class="slidev-layout sub-cover flex">
    <div class="w-full my-auto border-y s-border-fade py-8 px-20 flex flex-col items-center s-bg-fade shadow-md">
      <img class="object-contain w-60 max-h-24 h-fit pb-10" :src="frontMatter?.school?.badge" alt="school_badge"/>
      <h1 v-if="!frontMatter.title">{{mergedTitle}}</h1>
      <slot name="default"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useFrontMatter} from "../hooks";
import {computed} from "vue";

const { frontMatter } = useFrontMatter()

// make sure there has something
const mergedTitle = computed(() => {
  return frontMatter.value.section
      || "add section name or title in front-matter"
})
</script>