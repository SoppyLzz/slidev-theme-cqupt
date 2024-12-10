<template>
  <span v-if="!isHidden" class="absolute bottom-0 right-0 m-2 s-color-base text-lg">
    {{currentSlideNo}} | {{slides.length}}页
  </span>
</template>

<script lang="ts" setup>
import {useNav} from "@slidev/client";
import {useHidden} from "../hooks";

const {currentSlideNo, slides} = useNav()
const {isHidden} = useHidden()
</script>