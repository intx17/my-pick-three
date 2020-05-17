import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, object, text } from '@storybook/addon-knobs'
import SelectDropdownWithLabel from '~/components/atoms/SelectDropdownWithLabel.vue'
import { ISelectOption } from '~/src/components/atoms/select-dropdown'

const options: ISelectOption[] = [
  {
    value: 'value1',
    text: 'text1'
  },
  {
    value: 'value2',
    text: 'text2'
  }
]

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'SelectDropdownWithLabel',
    () => {
      return {
        components: { SelectDropdownWithLabel },
        template: '<SelectDropdownWithLabel :selected-value.sync="selectedValue" :options="options" :label-text="labelText" />',
        props: {
          selectedValue: {
            type: String,
            default: text('selectedValue', 'value1')
          },
          options: {
            type: Array,
            default: object('options', options)
          },
          labelText: {
            type: String,
            default: text('labelText', 'text')
          }

        }
      }
    })
