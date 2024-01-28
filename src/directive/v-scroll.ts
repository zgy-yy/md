import {Directive} from "vue";
import {throttle} from "@/utils";

let scrollHandler: (this: HTMLElement, ev: Event) => void;
const VScroll: Directive<HTMLElement, Function> = {

    created(el, binding) {
        const callBackFn = throttle(binding.value, 900)
        let lastHeight = 0

        scrollHandler = () => {
            const windowHeight = document.documentElement.clientHeight
            const scrollHeight = document.documentElement.scrollHeight
            const scrollTop = Math.max(document.documentElement.scrollTop, window.scrollY)
            if (scrollTop + windowHeight > scrollHeight - 930) {
                let elHeight = el.clientHeight;
                if (lastHeight !== elHeight) { //el 高度没变化不更新
                    callBackFn()
                    lastHeight = elHeight
                }
            }
        }
        window.addEventListener('scroll', scrollHandler)
    },
    unmounted(el) {
        el.removeEventListener('scroll', scrollHandler)
    }

}

export default VScroll