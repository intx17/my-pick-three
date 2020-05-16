<template>
  <div class="columns is-centered">
    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
      <div class="box">
        <text-input-with-label :label-text="'タスク名'" :value.sync="taskName" />
        <div class="field">
          <label class="label">カテゴリ</label>
          <div class="control">
            <select-dropdown :options="selectOptions" />
          </div>
        </div>
        <div class="field">
          <info-button-outlined :button-text="'Save'" @click.native="save()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

// components
import TextInputWithLabel from '~/components/atoms/TextInputWithLabel.vue'
import SelectDropdown from '~/components/atoms/SelectDropdown.vue'
import InfoButtonOutlined from '~/components/atoms/InfoButtonOutlined.vue'

// components interface
import { ISelectOption } from '~/src/components/atoms/select-dropdown'

// enums
import { TaskCategoryUtil } from '~/src/enums/task-category'

@Component({
  components: {
    TextInputWithLabel,
    SelectDropdown,
    InfoButtonOutlined
  }
})
export default class EditTaskForm extends Vue {
  private taskName: string = ''
  private selectOptions: ISelectOption[] = TaskCategoryUtil.getSelectOptions()

  @Emit()
  save () {

  }
}
</script>
