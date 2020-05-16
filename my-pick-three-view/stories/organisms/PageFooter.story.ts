import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, object } from '@storybook/addon-knobs'

// components
import PageFooter from '~/components/organisms/PageFooter.vue'

// component interfaces
import { ITab } from '~/src/components/atoms/tabs'

const tabs: ITab[] = [
  {
    tabName: 'Today'
  },
  {
    tabName: 'History'
  }
]

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'PageFooter',
    () => {
      return {
        components: { PageFooter },
        template: '<PageFooter />',
        props: {
          tabs: {
            type: Array,
            default: object('tabs', tabs)
          }
        }
      }
    })
