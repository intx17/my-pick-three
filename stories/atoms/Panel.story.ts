import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, object, text } from '@storybook/addon-knobs'
import Panel from '~/components/atoms/Panel.vue'
import { IPanelItem } from '~/src/components/atoms/panel'

// entities
import ICategory from '~/src/entities/category'

const panelCategories: ICategory[] = [
  {
    categoryCode: 1,
    categoryName: 'cat1'
  },
  {
    categoryCode: 2,
    categoryName: 'cat2'
  }
]

const panelTasks: IPanelItem[] = [
  {
    categoryCode: 1,
    itemId: 'id1',
    itemName: 'One'
  },
  {
    categoryCode: 2,
    itemId: 'id2',
    itemName: 'Two'
  },
  {
    categoryCode: 3,
    itemId: 'id3',
    itemName: 'Three'
  },
  {
    categoryCode: 4,
    itemId: 'id4',
    itemName: 'Four'
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
        template: '<Panel :title="title" :categories="categories" :items="items" />',
        props: {
          title: {
            type: String,
            default: text('title', 'title')
          },
          categories: {
            type: Array,
            default: object('categories', panelCategories)
          },
          items: {
            type: Array,
            default: object('imtess', panelTasks)
          }
        }
      }
    })
