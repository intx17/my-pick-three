import { Plugin } from '@nuxt/types'

const AxiosPlugin: Plugin = ({ $axios }): void => {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = localStorage.getItem('auth._token.local')
  })
}

export default AxiosPlugin
