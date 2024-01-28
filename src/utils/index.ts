export function throttle(fn: Function, delay: number) {
    let timer: number = -1

    return function (this: any) {
        if (timer > 0)
            return
        fn.apply(this, arguments)
        timer = setTimeout(() => {
            timer = -1
        }, delay)
    }
}

export function time2String(time: number) {
    let sec = time % 60
    let min = Math.floor(time / 60)
    let hor = Math.floor(min / 60)
    min = min % 60
    return `${hor}:${min > 9 ? min : '0' + min}:${sec > 9 ? sec : '0' + sec}`
}