import * as React from 'react'

import IndexLayout from '../layouts'
import PickedList from '../components/molecules/PickedList'
import TaskCategoryTabs from '../components/atoms/TaskCategoryTabs'
import { ICheckBoxWithLabelProps } from '../components/atoms/CheckBoxWithLabel'
import styled from '@emotion/styled'
import { dimensions, widths } from '../styles/variables'
import { getEmSize } from '../styles/mixins'

const checkboxesTmp: ICheckBoxWithLabelProps[] = [
  { checkBoxId: 'id1', labelText: 'text1' },
  { checkBoxId: 'id2', labelText: 'text2' }
]

const StyledPageDiv = styled.div`
  display: block;
  flex: 1;
  position: relative;
  padding: ${dimensions.containerPadding}rem;
  margin-bottom: 3rem;
`

const StyledContainerDiv = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: ${getEmSize(widths.lg)}em;
`

const IndexPage = () => (
  <IndexLayout>
    <StyledPageDiv>
      <StyledContainerDiv>
        <PickedList checkBoxWithLabelList={checkboxesTmp} />
        <TaskCategoryTabs />
      </StyledContainerDiv>
    </StyledPageDiv>
  </IndexLayout>
)

export default IndexPage
