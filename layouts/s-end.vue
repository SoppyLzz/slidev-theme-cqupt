<template>
  <div class="slidev-layout end flex flex-col items-center justify-center">
    <div class=" border s-border-fade w-150 min-h-80 relative overflow-hidden s-bg-fade shadow-md">
      <img class="absolute -bottom-10 -right-10 object-contain w-40 h-40" v-if="frontMatter?.school?.logo" :src="frontMatter?.school?.logo" alt="logo"/>
      <div class="absolute top-0 left-0 w-full h-full py-5 px-20 flex flex-col justify-center"><slot name="default"/></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useFrontMatter} from "../hooks";

const {frontMatter} = useFrontMatter()
</script>