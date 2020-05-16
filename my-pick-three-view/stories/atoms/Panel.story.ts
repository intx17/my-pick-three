import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, object, array, text } from '@storybook/addon-knobs'
import Panel from '~/components/atoms/Panel.vue'
import { IPanelItem } from '~/src/components/atoms/panel'

const panelCategories: string[] = [
  'cat1',
  'cat2'
]

const panelTasks: IPanelItem[] = [
  {
    name: 'One'
  },
  {
    name: 'Two'
  },
  {
    name: 'Three'
  },
  {
    name: 'Four'
  }
]

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'Panel',
    () => {
      return {
        components: { Panel },
        template: '<Panel :title="title" :categories="categories" :tasks="tasks" />',
        props: {
          title: {
            type: String,
            default: text('title', 'title')
          },
          categories: {
            type: Array,
            default: array('categories', panelCategories)
          },
          tasks: {
            type: Array,
            default: object('tasks', panelTasks)
          }
        }
      }
    })
