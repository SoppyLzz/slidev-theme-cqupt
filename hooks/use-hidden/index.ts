import {ref, watchEffect} from "vue";
import {useNav} from "@slidev/client";
import {useFrontMatter} from "../use-front-matter";
import {isArray} from "/utils";

export const useHidden = () => {
    const isHidden = ref<boolean>(false)

    const { currentSlideNo  } = useNav()
    const { frontMatter } = useFrontMatter()

    watchEffect(() => {
        if (frontMatter.value) {
            const checkBox = frontMatter.value?.hidden || []

            if (isArray(checkBox)) {
                isHidden.value = [currentSlideNo.value, frontMatter.value?.layout].reduce((acc, cur) => {
                    if (acc) return acc
                    return checkBox.includes(cur)
                }, false)
            }else {
                isHidden.value = checkBox === "hidden"
            }
        }else {
            isHidden.value = false
        }
    })

    return {
        isHidden
    }
}