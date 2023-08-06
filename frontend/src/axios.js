import axios from 'axios'
import router from '@/router'

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

instance.CancelToken = axios.CancelToken

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token')

  if (accessToken && accessToken !== 'undefined') {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('access_token_exp')

      router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default instance
