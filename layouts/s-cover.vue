<template>
  <div class="slidev-layout cover flex flex-col justify-center"><slot name="default"/></div>
  <s-waist :presenters="frontMatter.presenters" :instructors="frontMatter.instructors" :meeting="frontMatter.meeting"/>
</template>

<script setup>
import {useFrontMatter} from "../hooks";

const {frontMatter} = useFrontMatter()
</script>