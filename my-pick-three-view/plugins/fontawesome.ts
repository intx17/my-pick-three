import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faHandPointRight } from '@fortawesome/free-regular-svg-icons'
// import { faChrome } from '@fortawesome/free-brands-svg-icons'

// nuxt.config.tsでCSSファイルを追加
config.autoAddCss = false

// 利用するアイコンをlibraryに追加
library.add(fas)
// regularIcons.forEach(icon => library.add(icon))
// bransIcons.forEach(icon => library.add(icon))

// グローバルコンポーネントに登録
Vue.component('fa', FontAwesomeIcon)
