import * as React from 'react'
import styled from '@emotion/styled'

const StyledUl = styled.ul`
  display: flex;
  flex-direction: row;
  text-align: center;
`
const StyledLi = styled.li`
  flex: 1;
  flex-basis: 33%;
  list-style: none;
`

const StyledSpan = styled.span`
  display: block;
  text-decoration: none;
  color: #fff;
  background-color: ${(props: ITaskCategoryTabText) => (props.isActive ? '#000' : '#65c6ba')};
  cursor: pointer;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  line-height: 2;
`

interface ITaskCategoryTabText {
  isActive: boolean
}

interface ITaskCategoryTab {
  categoryName: string
  isActive: boolean
}

const tabs: ITaskCategoryTab[] = [
  {
    categoryName: 'All',
    isActive: true
  },
  {
    categoryName: 'Category1',
    isActive: false
  },
  {
    categoryName: 'Category2',
    isActive: false
  }
]

const TaskCategoryTabs: React.FC = () => (
  <StyledUl>
    {tabs.map(tab => (
      <StyledLi>
        <StyledSpan isActive={tab.isActive}>{tab.categoryName}</StyledSpan>
      </StyledLi>
    ))}
  </StyledUl>
)

export default TaskCategoryTabs
