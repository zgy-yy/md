import http from "@/api/request.ts";
import {d} from "@/api/decode.ts";

const pageSize = 20

export function getCircleDetail(id: number) {
    return http.post<any>('api/app/circle/details', {
        "circleId": id
    }).then(res => {
        let data: any = d(res.data)
        return data
    })
}

export function getCircleContent(id: number, pageNum: number, sort = 0) {
    return http.post<any>('api/app/circle/content', {
        "circleId": id, "contentType": 2, "pageNum": pageNum, "pageSize": pageSize, sort: sort
    }).then(res => {
        let data: any = d(res.data)
        return data
    })
}

