import Vue from 'vue'

import { configure, addDecorator } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)


const req = require.context('../stories', true, /\.stor(y|ies)\.tsx?$/)
const loadStories = () => {
  req.keys().forEach(req)
}

configure(loadStories, module)

addDecorator(withInfo)
addDecorator(withKnobs)
