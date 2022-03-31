import Cookies from "js-cookie"
const token = "tokenAdmin"
const username = "username"
//token
export function setToken (value) { Cookies.set(token,value) }
export function getToken () { return Cookies.get(token) }
export function removeToken () { return Cookies.remove(token) }
//username
export function setUsername (value) { Cookies.set(username,value) }
export function getUsername () { return Cookies.get(username) }
export function removeUsername () { return Cookies.remove(username)}