import {reactive, ref, watchEffect} from "vue";
import type {SlideInfoBase} from "@slidev/types";
import {useNav} from "@slidev/client";
import {isArray} from "/utils";
import {cKeys, defaultCquptConfig} from "/const";

export type CPage = {
    no: number;
    title: string;
}

export type CSection = {
    name: string;
    no: number;
    pages: CPage[];
}

export const useSections = () => {
    const sections = reactive<CSection[]>([])
    const currentSection = ref<CSection>()

    const {slides, currentSlideNo} = useNav()

    // sections
    watchEffect(() => {
        const _slides = slides.value

        let curNo = void 0
        let curSection = ''
        let tmp: CPage[] = []

        _slides.forEach(_raw => {
            const slide = _raw.meta.slide as SlideInfoBase

            const slideNo = slide.no
            const section = slide.frontmatter?.section
            const curFrontMatter = slide?.frontmatter || null

            const setFrontMatter = {
                ...Object.fromEntries(
                    Object.entries(curFrontMatter).filter(([key]) => cKeys.includes(key))
                ),
                no: slideNo
            }

            const frontMatter = {...defaultCquptConfig, ...setFrontMatter}

            if (section && section != curSection) {
                if(tmp.length > 0 && curSection) {
                    sections.push({
                        no: curNo,
                        pages: tmp,
                        name: curSection,
                    })
                }
                tmp = []; curSection = section; curNo = slideNo;
            }

            // filter-add page into one section
            let isRemove
            if (frontMatter) {
                const checkBox = frontMatter?.hidden || []
                if (isArray(checkBox)) {
                    isRemove = [slide.no, frontMatter.layout].reduce((acc, cur) => {
                        if (acc) return acc
                        return checkBox.includes(cur)
                    }, false)
                }else {
                    // hidden only for showing
                    // isRemove = checkBox === "hidden"
                }
            }else {
                isRemove = false
            }

            if (!isRemove) {
                tmp.push({
                    no: slide.no,
                    title: slide.title,
                })
            }
        })

        // return empty array while section not set
        if (tmp.length > 0 && curSection !== '') sections.push({
            no: curNo,
            pages: tmp,
            name: curSection,
        })
    })

    watchEffect(() => {
        currentSection.value = sections.find((sec) =>
            sec.pages.reduce((acc, cur)=> {
                if (acc) return acc
                return cur.no === currentSlideNo.value
            }, false)) || null
    })

    return {
        sections,
        currentSection,
    }
}