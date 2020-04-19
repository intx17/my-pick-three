import * as React from 'react'
import styled from '@emotion/styled'
import CheckBoxWithLabel, { ICheckBoxWithLabelProps } from '../atoms/CheckBoxWithLabel'

const StyledDiv = styled.div`
  > input[type='checkbox']:checked + label:before {
    width: 10px;
    top: -5px;
    left: 5px;
    border-radius: 0;
    opacity: 1;
    border-top-color: transparent;
    border-left-color: transparent;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  > input[type='checkbox'] + label:last-child {
    margin-bottom: 0;
  }
`

export interface IPickedListProps {
  checkBoxWithLabelList: ICheckBoxWithLabelProps[]
}

const PickedList: React.FC<IPickedListProps> = ({ checkBoxWithLabelList }) => (
  <StyledDiv>
    {checkBoxWithLabelList.map(listItem => (
      <CheckBoxWithLabel checkBoxId={listItem.checkBoxId} labelText={listItem.labelText} />
    ))}
  </StyledDiv>
)

export default PickedList
