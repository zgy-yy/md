export interface Category {
    id: number,
    name: string,
    showType: number
}

interface Circle {
    avatar: string,
    id: number,
    members: number,
    name: string,
    posts: number,
    role: number,
    videos: number
}

export interface CircleInfo {
    avatar: string;
    backGround: string;
    collects: number;
    desc: string;
    id: number;
    mediaLikes: number;
    mediaList: MediaInfo[];
    mediaWatches: number;
    memberList: null;
    members: number;
    name: string;
    postLikes: number;
    postWatches: number;
    posts: number;
    role: number;
    subscribed: boolean;
    videos: number;
}

interface Publisher {
    avatar: string;
    badge: string;
    cares: number;
    collects: number;
    fans: number;
    icon: string;
    id: number;
    introduction: string;
    isFollow: boolean;
    isUp: boolean;
    name: string;
    toCollects: number;
    works: number;
}

interface Discuss {
    careUser: number;
    circleInfo: CircleInfo;
    cover: string;
    describe: string;
    hotValue: number;
    id: number;
    isCare: boolean;
    publishCount: number;
    publisher: Publisher;
    title: string;
}

export interface MediaInfo {
    actorNames: null;
    addedTime: string;
    bango: string;
    circle: Circle;
    comments: number;
    coverImg: string;
    coverType: number;
    createdAt: string;
    desc: string;
    discuss: Discuss;
    height: number;
    id: number;
    isBuy: boolean;
    isCollet: boolean;
    isLike: boolean;
    likes: number;
    movieDiscount: number;
    payType: number;
    playTime: number;
    preTime: number;
    preVideoUrl: string;
    price: number;
    publisher: Publisher;
    shares: number;
    status: number;
    tags: string[];
    title: string;
    topicInfo: TopicInfo[];
    videoType: number;
    videoUrl: string;
    watchTimes: number;
    width: number;
    worksUpload: boolean;
}

export interface TopicInfo {
    circleList: null;
    cover: string;
    defaultType: number;
    desc: string;
    id: number;
    mediaList: MediaInfo[];
    movieCount: number;
    name: string;
    showType: number;
    tags: string[];
    watchTimes: number;
}

//返回数据类型

export type HomeData = {
    circleList: CircleInfo[],
    hotCircle: CircleInfo[],
    mediaList: MediaInfo[],
    topicList: TopicInfo[]
}

export type Media = {
    circleInfo: CircleInfo;
    code: number;
    collect: any; // 假设collect可能是null或undefined，因此使用any类型来代替严格的null或undefined检查。
    mediaInfo: MediaInfo;
    movieTickets: number;
    msg: string;
    playable: boolean;
    watchCount: number;
}


export interface User {
    actressBackgroud: string;
    age: number;
    avatarUrl: string;
    badge: string;
    balance: number;
    cardName: string;
    cardType: number;
    cares: number;
    circles: number;
    country: string;
    dicCodePromSeqe: string;
    districtCode: string;
    fans: number;
    gender: number;
    icon: string;
    id: number;
    introduction: string;
    inviteCode: string;
    inviteUrl: string;
    invites: number;
    isBoss: boolean;
    isUp: boolean;
    lastLoginAt: number;
    leftWatchTimes: number;
    loginType: number;
    medalBackgroudImg: string;
    medalCardName: string;
    medalImg: string;
    mobile: string;
    movieTickets: number;
    newMsg: boolean;
    nextLVName: string;
    nickName: string;
    posts: number;
    promIncome: number;
    recharge: number;
    region: string;
    score: number;
    score2NextLV: number;
    scoreLV: number;
    scoreLVName: string;
    scoreTotal: number;
    toLikes: number;
    token: string;
    totalWatchTimes: number;
    userBackgroud: string;
    userType: number;
    vipExpire: number;
    vipExpireTime: string;
    vipImage: string;
    vipType: number;
    workIncome: number;
}

export interface Collect {
    mediaList: MediaInfo[],
    modelList: [],
    postList: []
}