import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, object } from '@storybook/addon-knobs'

// components
import TaskCards from '~/components/molecules/TaskCards.vue'

// component interfaces
import { ITaskCard } from '~/src/components/molecules/taskCards'

const tasks: ITaskCard[] = [
  {
    taskTitle: 'Title1',
    taskDetail: 'Detail1'.repeat(10),
    done: true
  },
  {
    taskTitle: 'Title2',
    taskDetail: 'Detail2'.repeat(10),
    done: false
  },
  {
    taskTitle: 'Title3',
    taskDetail: 'Detail3'.repeat(10),
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
        components: { TaskCards },
        template: '<TaskCards :tasks="tasks" />',
        props: {
          tasks: {
            type: Array,
            default: object('tasks', tasks)
          }
        }
      }
    })
