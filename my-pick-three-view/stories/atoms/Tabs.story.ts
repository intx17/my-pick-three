import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, object } from '@storybook/addon-knobs'

// components
import Tabs from '@/components/atoms/Tabs.vue'

// component interfaces
import { ITab } from '@/src/components/atoms/tabs'

const tabs: ITab[] = [
  {
    tabName: 'Today'
  },
  {
    tabName: 'History'
  }
]

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'Tabs',
    () => {
      return {
        components: { Tabs },
        template: '<Tabs :tabs="tabs" />',
        props: {
          tabs: {
            type: Array,
            default: object('tabs', tabs)
          }
        }
      }
    })
