import axios, { AxiosInstance } from 'axios'

const API_URL: string =
  process.env.NEXT_PUBLIC_BASE_API_URL || 'https://baharmportodesain.my.id'

export const http = (
  authMode?: boolean,
  respType?: 'json' | 'blob' | 'file',
  baseUrl?: string,
  customTimeout?: number,
): AxiosInstance => {
  const _ax: AxiosInstance = axios.create({
    baseURL: baseUrl ?? API_URL,
    timeout:
      respType === 'blob' || respType === 'file'
        ? 9999999
        : customTimeout
          ? customTimeout
          : 15000,
    responseType: respType === 'blob' ? 'blob' : 'json',
  })

  _ax.interceptors.request.use(
    (config: any) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return _ax
}
