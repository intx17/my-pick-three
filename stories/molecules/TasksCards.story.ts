import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'

// components
import TaskCards from '~/components/molecules/TaskCards.vue'

// component interfaces
import { ITaskCard } from '~/src/components/molecules/task-cards'

const taskCards: ITaskCard[] = [
  {
    cardId: 'CardId1',
    categoryCode: 1,
    title: 'Title1',
    detail: 'Detail1'.repeat(10),
    done: true
  },
  {
    cardId: 'CardId2',
    categoryCode: 2,
    title: 'Title2',
    detail: 'Detail2'.repeat(10),
    done: false
  },
  {
    cardId: 'CardId3',
    categoryCode: 3,
    title: 'Title3',
    detail: 'Detail3'.repeat(10),
    done: false
  }
]

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'TaskCards',
    () => {
      return {
        components: {
          TaskCards: {
            extends: TaskCards,
            computed: {
              taskCards () {
                return taskCards
              }
            }
          }
        },
        template: '<TaskCards />'
      }
    })
