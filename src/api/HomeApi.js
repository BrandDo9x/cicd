import { get, post } from './BaseRequest'

export const getList = (params = null) => get('home', params)
export const createHome = (params) => post('home', params)
export const getDetail = (id) => get(`home/${id}`)
