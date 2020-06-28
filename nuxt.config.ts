import { NuxtAxiosInstance } from '@nuxtjs/axios'
require('dotenv').config()

// For Netlify Deploy
const env = {
  API_KEY: process.env.API_KEY,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  DATABASE_URL: process.env.DATABASE_URL,
  BASE_URL: process.env.BASE_URL,
  PROJECT_ID: process.env.PROJECT_ID,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
  APP_ID: process.env.APP_ID,
  MEASUREMENT_ID: process.env.MEASUREMENT_ID
}

export default {
  // For Netlify Deploy
  env,
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
    },
    '@fortawesome/fontawesome-svg-core/styles.css'
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
    '~/plugins/axios',
    '~/plugins/firebase',
    '~/plugins/fontawesome',
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
    baseURL: process.env.BASE_URL,
    proxy: true
  },
  proxy: {
    '/api/': {
      target: process.env.BASE_URL,
      pathRewrite: {
        '^/api/': '/'
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
