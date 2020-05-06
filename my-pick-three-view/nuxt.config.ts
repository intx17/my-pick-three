import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Auth } from 'nuxtjs__auth'

export default {
  mode: 'spa',
  server: {
    // host: '0.0.0.0' // default: localhost
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  head: {
    title: 'my-pick-three',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'my-pick-three' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/proxy'
  ],
  buildModules: ['@nuxt/typescript-build'],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://localhost:8000/v1'
  },
  proxy: {
    '/v1/': {
      target: 'http://localhost:8000',
      pathRewrite: {
        '^/v1/': '/'
      }
    }
  },
  auth: {
    redirect: {
      // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
      login: '/login',
      // ログアウト時のリダイレクトURL
      logout: '/login',
      // Oauth認証等で必要となる コールバックルート
      callback: false,
      // ログイン後のリダイレクトURL
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'accessToken' },
          logout: false,
          user: false
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config: any, ctx: any) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
// this.$axios 等に必要
declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth
    $axios: NuxtAxiosInstance
  }
}
