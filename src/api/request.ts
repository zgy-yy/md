import axios, {type AxiosRequestConfig} from "axios";
import {E} from "./decode";

const instance = axios.create({
    baseURL: '/host',
    timeout: 20 * 1000,
    withCredentials: true
})


//请求拦截器
instance.interceptors.request.use(
    (config: AxiosRequestConfig | any) => {
        config.params = {
            ...config.params,
        }
        config.headers = {
            ...config.headers,
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJwdWJsaWMiLCJleHAiOjE3MDc4MjM0MzgsImlzc3VlciI6ImNvbS5idXR0ZXJmbHkiLCJzdWIiOiJhc2lnbiIsInVzZXJJZCI6NjQ1NDU5Mn0.-A-qljzB23DyzBFAI79Yu8UeZAHOefzO8deMXJn5OTU",
            Cookie: "sq_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJwdWJsaWMiLCJleHAiOjE3MDc4MjM0MzgsImlzc3VlciI6ImNvbS5idXR0ZXJmbHkiLCJzdWIiOiJhc2lnbiIsInVzZXJJZCI6NjQ1NDU5Mn0.-A-qljzB23DyzBFAI79Yu8UeZAHOefzO8deMXJn5OTU",
            Serect: 'kaFttDJRcahRMTI7',
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
            "X-User-Agent": "DevType=Apple iPhone mobile;SysType=h5_ios;Ver=1.0.1+27;BuildID=Mobile Safari 16.6"
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);


interface ResType<T> {
    code: number,
    data: T,
    hash: boolean,
    msg: string,
    time: string,
    tip: string
}

interface Http {
    get<T>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<ResType<T>>;

    post<T>(url: string, data?: unknown): Promise<ResType<T>>;
}

let e = {
    XUserAgent: "DevType=Apple iPhone mobile;SysType=h5_ios;Ver=1.0.1+27;BuildID=Mobile Safari 16.6",
    apiPath: "/api/app/media/home",
    serect: "kaFttDJRcahRMTI7",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJwdWJsaWMiLCJleHAiOjE3MDc4MjM0MzgsImlzc3VlciI6ImNvbS5idXR0ZXJmbHkiLCJzdWIiOiJhc2lnbiIsInVzZXJJZCI6NjQ1NDU5Mn0.-A-qljzB23DyzBFAI79Yu8UeZAHOefzO8deMXJn5OTU"
}
const http: Http = {
    get<T>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<ResType<T>> {
        return new Promise<ResType<T>>((resolve, reject) => {
            instance
                .get(url, config)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    },
    post<T>(url: string, data?: unknown): Promise<ResType<T>> {
        return new Promise<ResType<T>>((resolve, reject) => {
            e.apiPath = '/' + url
            instance.post(url, data, {
                headers: {
                    "X-Api-Key": E(e),
                }
            })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    },
}

export default http