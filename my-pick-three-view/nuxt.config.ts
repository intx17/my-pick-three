import { NuxtAxiosInstance } from '@nuxtjs/axios'
require('dotenv').config()

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
  router: {
    // middleware: ['authMiddleWare']
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    {
      src: '~assets/css/main.scss',
      lang: 'scss'
    }
  ],
  postcss: {
    plugins: {
      'postcss-custom-properties': {
        warnings: false
      }
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    '@nuxtjs/bulma',
    '@nuxtjs/font-awesome'
  ],
  buildModules: ['@nuxt/typescript-build'],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.DATABASE_URL
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
    $axios: NuxtAxiosInstance
  }
}
