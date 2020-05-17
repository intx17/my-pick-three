import Vue from 'vue'

import 'bulma/css/bulma.css'

import { configure, addDecorator } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('fa', FontAwesomeIcon);


const req = require.context('../stories', true, /\.stor(y|ies)\.tsx?$/)
const loadStories = () => {
  req.keys().forEach(req)
}

configure(loadStories, module)

// 汎用モックstore
const storeOption = {
  modules: {
    'select-task-modal' : {
      namespaced: true,
      state: {
        _panelCategories: []
      },
      getters: {
        // モックデータを返す
        panelCategories: () => []
      }
    }
  }
}

addDecorator(withInfo)
addDecorator(withKnobs)
