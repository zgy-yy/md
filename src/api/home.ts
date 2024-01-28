import http from "./request";
import {d, dImg} from "./decode";
import {Category, HomeData,  Media, MediaInfo, TopicInfo} from "./types";
import axios from "axios";

let pageSize = 20

// 图片资源
export function getImgdata(path: string) {
    return axios.get<string>('/imgHost' + path, {
        responseType: "arraybuffer"
    }).then(res => {
        let data: string = dImg(res.data)
        return data
    })
}

// 获取分类
export function getConfig() {
    return http.get<Category[]>('/api/app/ping/config').then(res => {
        let data = d(res.data)
        return data.category as Category[]
    })
}

// 根据id获取分类信息
export function getMediaHome(id: number, pageNum: number) {
    return http.post<HomeData>('api/app/media/home', {"id": id, "pageNum": pageNum, "pageSize": pageSize}).then(res => {
        let data: HomeData = d(res.data)
        return data
    })
}

// topic里的内容
export function getTopicDetails(id: number, pageNum: number) {
    return http.post<TopicInfo>('api/app/media/topic/details', {
        "id": id, "mediaType": 2, "pageNum": pageNum, "pageSize": pageSize
    }).then(res => {
        let data: TopicInfo = d(res.data)
        return data
    })
}

// 获取标签
export function getNewTags() {
    return http.post<string[]>('api/app/works/select/tags').then(res => {
        let data: string[] = d(res.data).tagList
        return data
    })
}

// 根据tag 获取media数据
export function getMediaCategory(pageNum: number, mediaTag: string, mediaType: number, sortType: number, priceType: number) {
    return http.post<MediaInfo[]>('api/app/media/category',
        {
            "mediaType": mediaType,
            "mediaTag": mediaTag,
            "sortType": sortType,
            priceType: priceType,
            "pageNum": pageNum,
            "pageSize": pageSize
        }
    ).then(res => {
        let data: MediaInfo[] = d(res.data).mediaList
        return data
    })
}

// 视频播放
export function getMediaPlay(id: number) {
    return http.post<Media>('api/app/media/play', {id}).then(res => {
        let data: Media = d(res.data)
        return data
    })
}