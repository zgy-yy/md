import {defineStore} from 'pinia'
import {ref} from "vue";

export const useVidURlStore = defineStore('VidURL', () => {
    const vidUrl = ref('')
    const vidTitle = ref('')

    function changeVidURL(url: string, title: string) {
        vidUrl.value = "https://yuwhuxuw.com/api/app/media/m3u8/" + url
        vidTitle.value = title
        console.log(vidTitle.value)
    }

    return {vidUrl, vidTitle, changeVidURL}
})