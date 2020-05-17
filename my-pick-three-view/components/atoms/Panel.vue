<template>
  <article class="panel is-info">
    <p class="panel-heading">{{ title }}</p>
    <p class="panel-tabs">
      <a
        v-for="(category, index) in categoriesWithAll"
        :key="index"
        @click="selectCategory(category.categoryId)"
        :class="{ 'is-active': selectedCategory === Number(category.categoryId) }"
      >
        {{ category.categoryName }}
      </a>
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-info" type="text" placeholder="Search">
        <span class="icon is-left">
          <fa icon="search" aria-hidden="true" />
        </span>
      </p>
    </div>
    <a
      @click="selectItem(item.itemId)"
      v-for="(item, index) in filteredItems"
      :key="index"
      class="panel-block"
    >
      <span class="panel-icon">
        <fa icon="tasks" aria-hidden="true" />
      </span>
      {{ item.itemName }}
    </a>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

// components interface
import { IPanelItem } from '~/src/components/atoms/panel'

// entities
import ICategory from '~/src/entities/category'
import { TaskCategory } from '~/src/enums/task-category'

@Component({})
export default class Panel extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Array, required: true })
  private categories!: ICategory[]

  @Prop({ type: Array, required: true })
  private items!: IPanelItem[]

  private selectedCategory: TaskCategory = TaskCategory.All

  get filteredItems () {
    if (this.selectedCategory === TaskCategory.All) {
      return this.items
    }

    return this.items
      .filter(item => item.category === this.selectedCategory)
  }

  get categoriesWithAll () {
    const all: ICategory = {
      categoryId: 0,
      categoryName: '全て'
    }
    const categories = this.categories.slice()
    categories.unshift(all)
    categories.sort((catA, catB) => {
      return catA.categoryId - catB.categoryId
    })
    return categories
  }

  // methods
  private selectCategory (categoryId: number) {
    const category = Number(categoryId)
    this.selectedCategory = category
  }

  // 親コンポーネントでDBへの処理を行う
  @Emit()
  private selectItem (itemId: string) {
    return itemId
  }
}
</script>

<style scoped>
.panel {
  /* パネルの下部分が不自然なので修正 */
  padding-bottom: 0.5rem;
}
@media screen and (max-width:768px) {
  .panel {
    /* タブレット・スマホで左右にマージンをつける */
    margin: 0px 1rem;
  }
}
.panel-block:last-child {
    border-bottom: 1px solid #ededed;
}
</style>
