import * as Cry from "crypto-js"

let o = []
o[43] = 62
o[45] = 62
o[47] = 63
o[48] = 52
o[49] = 53
o[50] = 54
o[51] = 55
o[52] = 56
o[53] = 57
o[54] = 58
o[55] = 59
o[56] = 60
o[57] = 61
o[65] = 0
o[66] = 1
o[67] = 2
o[68] = 3
o[69] = 4
o[70] = 5
o[71] = 6
o[72] = 7
o[73] = 8
o[74] = 9
o[75] = 10
o[76] = 11
o[77] = 12
o[78] = 13
o[79] = 14
o[80] = 15
o[81] = 16
o[82] = 17
o[83] = 18
o[84] = 19
o[85] = 20
o[86] = 21
o[87] = 22
o[88] = 23
o[89] = 24
o[90] = 25
o[95] = 63
o[97] = 26
o[98] = 27
o[99] = 28
o[100] = 29
o[101] = 30
o[102] = 31
o[103] = 32
o[104] = 33
o[105] = 34
o[106] = 35
o[107] = 36
o[108] = 37
o[109] = 38
o[110] = 39
o[111] = 40
o[112] = 41
o[113] = 42
o[114] = 43
o[115] = 44
o[116] = 45
o[117] = 46
o[118] = 47
o[119] = 48
o[120] = 49
o[121] = 50
o[122] = 51

let r = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/']

function fe(e, t, n) {
    for (var o, A, output = [], i = t; i < n; i += 3)
        o = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (255 & e[i + 2]),
            output.push(r[(A = o) >> 18 & 63] + r[A >> 12 & 63] + r[A >> 6 & 63] + r[63 & A]);
    return output.join("")
}

function fromByteArray(e) {
    for (var t, n = e.length, o = n % 3, A = [], c = 16383, i = 0, l = n - o; i < l; i += c)
        A.push(fe(e, i, i + c > l ? l : i + c));
    1 === o ? (t = e[n - 1],
        A.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === o && (t = (e[n - 2] << 8) + e[n - 1],
        A.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
    return A.join("")
}


function l(e) {
    var t = e.length;
    if (t % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
    var n = e.indexOf("=");
    return -1 === n && (n = t),
        [n, n === t ? 0 : 4 - n % 4]
}

function toByteArray(e) {
    let A = Uint8Array
    var t, i, n = l(e), r = n[0], c = n[1], f = new A(function (e, t, n) {
        return 3 * (t + n) / 4 - n
    }(0, r, c)), d = 0, h = c > 0 ? r - 4 : r;
    for (i = 0; i < h; i += 4)
        t = o[e.charCodeAt(i)] << 18 | o[e.charCodeAt(i + 1)] << 12 | o[e.charCodeAt(i + 2)] << 6 | o[e.charCodeAt(i + 3)],
            f[d++] = t >> 16 & 255,
            f[d++] = t >> 8 & 255,
            f[d++] = 255 & t;
    2 === c && (t = o[e.charCodeAt(i)] << 2 | o[e.charCodeAt(i + 1)] >> 4,
        f[d++] = 255 & t);
    1 === c && (t = o[e.charCodeAt(i)] << 10 | o[e.charCodeAt(i + 1)] << 4 | o[e.charCodeAt(i + 2)] >> 2,
        f[d++] = t >> 8 & 255,
        f[d++] = 255 & t);
    return f
}

// 返回数据解码
export function d(e) {
    var t = "vEukA&w15z4VAD3kAY#fkL#rBnU!WDhN"
        , n = Array.from(toByteArray(e))
        , c = n.splice(0, 12)
        , d = function (text) {
        for (var code = encodeURIComponent(text), e = [], i = 0; i < code.length; i++) {
            var t = code.charAt(i);
            if ("%" === t) {
                var n = code.charAt(i + 1) + code.charAt(i + 2)
                    , r = parseInt(n, 16);
                e.push(r),
                    i += 2
            } else
                e.push(t.charCodeAt(0))
        }
        return e
    }(t)
        , h = [].concat(d, c)
        , v = Math.floor(h.length / 2)
        , m = fromByteArray(h)
        , y = Cry.enc.Base64.parse(m)
        , w = T(Cry.SHA256(y).toString()).splice(8, 16)
        , B = [].concat(w, h.splice(0, v))
        , C = fromByteArray(B)
        , _ = Cry.enc.Base64.parse(C)
        , x = T(Cry.SHA256(_).toString())
        , S = [].concat(h, w)
        , E = fromByteArray(S)
        , U = Cry.enc.Base64.parse(E)
        , k = T(Cry.SHA256(U).toString())
        , Q = [].concat(x.splice(0, 8), k.splice(8, 16), x.splice(16, 24))
        , F = [].concat(k.splice(0, 4), x.splice(4, 8), k.splice(8, 12))
        , data = fromByteArray(n)
        , O = Cry.enc.Base64.parse(fromByteArray(Q))
        , I = Cry.enc.Base64.parse(fromByteArray(F));
    let res = Cry.AES.decrypt(data, O, {
        iv: I,
        mode: Cry.mode.CBC
    }).toString(Cry.enc.Utf8);
    return JSON.parse(res)

    function T(e) {
        var t = 0
            , n = e.length;
        if (n % 2 != 0)
            return null;
        n /= 2;
        for (var r = [], i = 0; i < n; i++) {
            var s = e.substr(t, 2)
                , o = parseInt(s, 16);
            r.push(o),
                t += 2
        }
        return r
    }
}

// 请求数据编码
export function E(e) {
    var t = e.token
        , n = e.apiPath
        , r = e.XUserAgent
        , o = e.serect
        , A = parseInt(new Date((new Date).toUTCString()).getTime() / 1e3)
        , l = function () {
        for (var s = [], e = "0123456789abcdef", i = 0; i < 36; i++)
            s[i] = e.substr(Math.floor(16 * Math.random()), 1);
        return s[14] = "4",
            s[19] = e.substr(3 & s[19] | 8, 1),
            s[8] = s[13] = s[18] = s[23] = "-",
            s.join("")
    }()
        , f = t + "&" + n + "&" + r + "&" + A.toString() + "&" + l
        , d = Cry.HmacSHA1(f, o);
    return "timestamp=".concat(A, ";sign=").concat(d, ";nonce=").concat(l)
}


export function dImg(data) {
    let o = new Uint8Array([50, 48, 49, 57, 121, 115, 97, 112, 112, 55, 53, 50, 55])
    let r = new Uint8Array([136, 168, 48, 203, 16, 118])
    let A = [new Uint8Array([255, 216, 255]), new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), new Uint8Array([71, 73, 70])];

    function c(e) {
        if (null != e && 0 != e.length) {
            for (var t, n = !1, i = 0; i < r.length; i++)
                r[i] == e[i] && (n = !0);
            return n ? (t = -1,
                e = e.map((function (e) {
                        return ++t < r.length && e == r[t] ? null : 163 ^ e
                    }
                ))) : function (e) {
                for (var t = !1, n = A.length, i = 0; i < n; i++) {
                    t = !1;
                    for (var r = 0; r < A[i].length; r++)
                        if (A[i][r] != e[r]) {
                            t = !0;
                            break
                        }
                    if (!t)
                        break
                }
                return t
            }(e) && (e = function (e, t, n) {
                var r = e.length
                    , o = t.length;
                (n > r || n <= 0) && (n = r);
                for (var i = 0; i < n; i += o)
                    for (var A = 0; A < o && i + A < n; A++)
                        e[i + A] ^= t[A];
                return e
            }(e, o, 100)),
                e
        }
    }

    let S = function (e) {
        var t = window.btoa(e)
            , n = t.substring(t.indexOf(",") + 1);
        return "data:image/".concat("gif", ";base64,").concat(n)
    }

    for (var res = "", byteArr = new Uint8Array(data), transArr = c(byteArr), len = transArr.byteLength, i = 0; i < len; i++)
        res += String.fromCharCode(transArr[i]);
    return S(res)
}