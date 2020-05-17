<template>
  <article class="panel is-info">
    <p class="panel-heading">{{ title }}</p>
    <p class="panel-tabs">
      <a
        v-for="(category, index) in categoriesWithAll"
        :key="index"
        @click="selectCategory(category.categoryId)"
        :class="{ 'is-active': selectedCategoryId === Number(category.categoryId) }"
      >
        {{ category.categoryName }}
      </a>
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input
          v-model="searchWord"
          class="input is-info"
          type="text"
          placeholder="Search"
        >
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

@Component({})
export default class Panel extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Array, required: true })
  private categories!: ICategory[]

  @Prop({ type: Array, required: true })
  private items!: IPanelItem[]

  private searchWord: string = ''

  private selectedCategoryId: number = 0

  get filteredItems () {
    const categoryItems = this.selectedCategoryId === 0
      ? this.items
      : this.items
        .filter(item => item.categoryId === this.selectedCategoryId)

    return categoryItems
      .filter(item => item.itemName.includes(this.searchWord))
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
    this.selectedCategoryId = categoryId
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
