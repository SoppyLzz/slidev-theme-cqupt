import {useNav} from "@slidev/client";
import {reactive, watchEffect} from "vue";
import {useSections} from "../use-sections";

export type BreadcrumbItem = {
    title: string;
    no: number;
}

export const useBreadcrumbs = () => {
    const breadcrumbs = reactive<BreadcrumbItem[]>([])

    const {currentSlideNo, slides} = useNav()
    const {currentSection} = useSections()

    watchEffect(() => {
        // init breadcrumbs
        breadcrumbs.length = 0

        const _slides = slides.value
        let curPageNo = currentSlideNo.value
        let curLevel = void 0

        for (let i = curPageNo - 1; i >= 1; i--) {
            // continue while curLevel didn't exist
            if (!_slides[i].meta.slide.level) continue;

            curLevel = _slides[i].meta.slide.level
            // as long as there is a title, there must be a level
            breadcrumbs.unshift({
                title: _slides[i].meta.slide.title,
                no: _slides[i].meta.slide.no,
            })

            // level-1 is the top level
            if (curLevel === 1) break;
        }

        // add section name to breadcrumbs
        if (currentSection.value) {
            breadcrumbs.unshift({
                title: currentSection.value.name,
                no: currentSection.value.no,
            })
        }

        // final add zero-page
        breadcrumbs.unshift({
            title: _slides[0].meta.slide.title,
            no: _slides[0].meta.slide.no
        })
    })

    return {
        breadcrumbs,
    }
}