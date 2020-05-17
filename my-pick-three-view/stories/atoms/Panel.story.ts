import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, object, text } from '@storybook/addon-knobs'
import Panel from '~/components/atoms/Panel.vue'
import { IPanelItem } from '~/src/components/atoms/panel'

// entities
import ICategory from '~/src/entities/category'
import { TaskCategory } from '~/src/enums/task-category'

const panelCategories: ICategory[] = [
  {
    categoryId: 1,
    categoryName: 'cat1'
  },
  {
    categoryId: 2,
    categoryName: 'cat2'
  }
]

const panelTasks: IPanelItem[] = [
  {
    category: TaskCategory.Eating,
    itemId: 'id1',
    itemName: 'One'
  },
  {
    category: TaskCategory.Eating,
    itemId: 'id2',
    itemName: 'Two'
  },
  {
    category: TaskCategory.Eating,
    itemId: 'id3',
    itemName: 'Three'
  },
  {
    category: TaskCategory.Eating,
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
