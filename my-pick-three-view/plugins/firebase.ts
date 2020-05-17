import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Plugin } from '@nuxt/types'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  })
  firebase.auth().useDeviceLanguage()
}

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: any,
    $auth: firebase.auth.Auth,
    $db: firebase.firestore.Firestore,
    // $storage: any,
    $currentUser: firebase.User | null
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $firebase:any,
    $auth: firebase.auth.Auth,
    $db: firebase.firestore.Firestore,
    // $storage: any,
    $currentUser: firebase.User | null
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $firebase:any,
    $auth: firebase.auth.Auth,
    $db: firebase.firestore.Firestore,
    // $storage: any,
    $currentUser: firebase.User | null
}}

// inject plugins
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebasePlugin: Plugin = (context, inject) => {
  inject('firebase', firebase)
  inject('auth', firebase.auth())
  inject('db', firebase.firestore())
  // inject('storage', firebase.storage())
  inject('currentUser', firebase.auth().currentUser)
}

export default firebasePlugin
