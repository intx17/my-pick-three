import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, object } from '@storybook/addon-knobs'
import Panel from '~/components/atoms/Panel.vue'
import { IPanel } from '~/src/components/atoms/panel'

const panelData: IPanel = {
  categories: [
    'cat1',
    'cat2'
  ],
  tasks: [
    {
      taskName: 'One'
    },
    {
      taskName: 'Two'
    },
    {
      taskName: 'Three'
    },
    {
      taskName: 'Four'
    }
  ]
}

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'Panel',
    () => {
      return {
        components: { Panel },
        template: '<Panel :panelData="panelData" />',
        props: {
          panelData: {
            type: Object,
            default: object('data', panelData)
          }
        }
      }
    })
