import http from "@/api/request.ts";
import {d} from "@/api/decode.ts";
import {Category, MediaInfo} from "@/api/types.ts";

let pageSize = 12

// 总榜10192 、黑料 10574、媚 28774、抖音 22112、
export function getRackCat() {
    return http.post<Category[]>('api/app/media/rank/category', {}).then(res => {
        let data = d(res.data)
        return data.list as Category[]
    })
}


// 总榜10192 、黑料 10574、媚 28774、抖音 22112、
export function getRankMedia(id: number, pageNum: number) {
    return http.post<MediaInfo[]>('api/app/media/rank', {
        "category": id,
        "pageNum": pageNum,
        "pageSize": pageSize
    }).then(res => {
        let data = d(res.data)
        return data.list as MediaInfo[]
    })
}