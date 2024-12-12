import axios from "axios";

export const apiWF = axios.create({
    baseURL: "https://x-paysmart.com/version-test/api/1.1/wf"
    //baseURL: "http://xpaybank.bubbleapps.io/version-test/api/1.1/wf",
})

export const apiOBJ = axios.create({
    baseURL: "https://x-paysmart.com/version-test/api/1.1/obj"
})