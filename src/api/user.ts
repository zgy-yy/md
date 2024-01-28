import http from "@/api/request.ts";
import {d} from "@/api/decode.ts";
import {Collect, User} from "@/api/types.ts";

export function getUserInfo() {
    return http.post<User>('api/app/user/info', {}).then(res => {
        return d(res.data) as User
    })
}

export function getUserCollect(userId: number, pageNum: number = 1) {
    return http.post<Collect>('api/app/collect/list', {
        coverType: 2,
        pageNum: pageNum,
        pageSize: 10,
        type: 2,
        userId: userId
    }).then(res => {
        return d(res.data) as Collect
    })
}

export function addMediaCollect(id: number, add: boolean = true) {
    return http.post<{ code: number, msg: string }>('api/app/collect/add', {
        collect_type: 2,
        flag: add,
        isCollet: false,
        object_id: id
    }).then(res => {
        return res as { code: number, msg: string }
    })
}