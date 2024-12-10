<template>
  <component
      v-if="frontMatter?.background && frontMatter.background?.name"
      :is="frontMatter.background?.name" v-bind="attrs"/>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {useFrontMatter} from "../hooks";

const {frontMatter} = useFrontMatter()

const attrs = computed(() => {
  return {...frontMatter.value.background, 'name': void 0}
})
</script>