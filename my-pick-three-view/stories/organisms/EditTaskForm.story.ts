import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import EditTaskForm from '~/components/organisms/EditTaskForm.vue'

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'EditTaskForm',
    () => {
      return {
        components: { EditTaskForm },
        template: '<EditTaskForm />'
      }
    })
