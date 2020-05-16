import 'bulma/css/bulma.css'

import { configure, addDecorator } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'

const req = require.context('../stories', true, /\.stor(y|ies)\.tsx?$/)
const loadStories = () => {
  req.keys().forEach(req)
}

configure(loadStories, module)

addDecorator(withInfo)
addDecorator(withKnobs)
