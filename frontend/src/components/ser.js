import axios from 'axios'

export const murl=process.env.REACT_APP_RPORT||"http://localhost:9000"

export function productsdis() {
    return axios.get(`${murl}/productsdis`)
}
export function productsdisbyid(v) {
    return axios.get(`${murl}/productsdis/${v}`)
}

export function productsdisbycategory(cat, wear) {
    return axios.get(`${murl}/productsdisbycategory/${cat}/${wear}`)
}
export function productsdisbycategoryandwear(v) {
    return axios.get(`${murl}/productsdisbycategory/${v}`)
}
export function addpro(data) {
    return axios.post(`${murl}/addpro`, data)
}
export function getcat(v) {
    return axios.get(`${murl}/getcat/${v}`)
}
export function deletepro(v) {
    return axios.delete(`${murl}/delpro/${v}`)
}

export function deletefrom(data, v) {
    return axios.post(`${murl}/deletefrom/${v}`, data)
}

export function upprobyimage(data) {
    return axios.post(`${murl}/upprobyimage`, data)
}
export function upprowithoutimage(data) {
    return axios.post(`${murl}/upprowithoutimage`, data)
}
export function login(s, data) {
    return axios.post(`${murl}/login/${s}`, data)
}

export function resetpassword(data) {
    return axios.post(`${murl}/resetpassword`, data)
}

export function upcartq(data) {
    return axios.post(`${murl}/upcartq`, data)
}

export function resetpasswordaftermail(data) {
    return axios.post(`${murl}/resetpasswordaftermail`, data)
}
export function contact(data) {
    return axios.post(`${murl}/contact`, data)
}


export function register(data) {
    return axios.post(`${murl}/register`, data)
}
export function registersl(data) {
    return axios.post(`${murl}/registersl`, data)
}

export function cart(v) {
    return axios.get(`${murl}/cart/${v}`)
}
export function orders(v) {
    return axios.get(`${murl}/orders/${v}`)
}

export function atc(data) {
    return axios.post(`${murl}/atc`, data)
}
export function atw(data) {
    return axios.post(`${murl}/atw`, data)
}
export function addaddress(data) {
    return axios.post(`${murl}/addaddress`, data)
}
export function getaddress(data) {
    return axios.get(`${murl}/getaddress/${data}`)
}
export function deladdress(data, ind) {
    return axios.get(`${murl}/deladdress/${data}/${ind}`)
}

export function wish(v) {
    return axios.get(`${murl}/wish/${v}`)
}

export function order(data) {
    return axios.post(`${murl}/order`, data)
}

export function upname(data) {
    return axios.post(`${murl}/upname`, data)
}