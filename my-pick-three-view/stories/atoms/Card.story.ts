import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import Card from '~/components/atoms/Card.vue'

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'Card',
    () => {
      return {
        components: { Card },
        template: '<Card :cardId="cardId" :title="title" :detail="detail" :done="done" />',
        props: {
          cardId: {
            type: String,
            default: text('cardId', 'cardId')
          },
          title: {
            type: String,
            default: text('title', 'title')
          },
          detail: {
            type: String,
            default: text('detail', 'detail'.repeat(10))
          },
          done: {
            type: Boolean,
            default: boolean('done', false)
          }
        }
      }
    })
