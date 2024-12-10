<template>
  <s-nav v-if="frontMatter?.header && frontMatter?.header.name === 'SNav'" />
  <s-breadcrumb v-if="frontMatter?.header && frontMatter?.header.name === 'SBreadcrumb'" />
</template>

<script lang="ts" setup>
import {useFrontMatter} from "../hooks";

const {frontMatter} = useFrontMatter()
</script>