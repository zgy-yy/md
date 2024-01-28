import {Directive} from "vue";

export const VLazy: Directive<HTMLImageElement, () => Promise<string>> = {
    mounted(el, binging) {
        let func = binging.value
        const observer = new IntersectionObserver(([{isIntersecting}]) => {
            if (isIntersecting) {
                observer.unobserve(el)
                el.onerror = () => {
                    console.log('err')
                    el.src = ''
                }
                func().then(res => {
                    el.src = res
                })
            }
        })
        observer.observe(el)
    },

}