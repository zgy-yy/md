import {Directive, h, render} from "vue";
import Loading from "@/components/Loading.vue";


export const VLoading: Directive<HTMLImageElement, boolean> = {
    created(el, binging) {

        const loadingNode = h(Loading, {name: '...'})
        if (binging.value) {
            render(loadingNode, el)
        }
    },
    updated(el, binging) {
        const loadingNode = h(Loading, {name: '...'})
        if (binging.value) {
            render(loadingNode, el)
        } else {
            render(null, el)
        }
    }

}