import {ref, watchEffect} from "vue";
import {useNav} from "@slidev/client";
import {cKeys, defaultCquptConfig} from "/const";

import type {SlideInfoBase} from "@slidev/types";
import type {CquptFrontMatter} from "/const";
import {filterNone} from "/utils";

export const useFrontMatter = () => {
    const frontMatter = ref<CquptFrontMatter>()

    const { currentSlideRoute } = useNav()

    watchEffect(() => {
        const curSlide = currentSlideRoute.value.meta?.slide as SlideInfoBase
        const curFrontMatter = curSlide?.frontmatter || {}

        const setFrontMatter = filterNone({
            ...Object.fromEntries(
                Object.entries(curFrontMatter).filter(([key]) => cKeys.includes(key))
            ),
            title: curSlide.title,
            no: curSlide.no,
        })

        frontMatter.value = {...defaultCquptConfig, ...setFrontMatter}
    })

    return {
        frontMatter
    }
}