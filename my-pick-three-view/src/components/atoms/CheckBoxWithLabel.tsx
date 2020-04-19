import * as React from 'react'
import styled from '@emotion/styled'

const StyledCheckBox = styled.input`
  display: none;
`
const StyledLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 20px;
  color: #555;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid #6cc0e5;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.6;
    -webkit-transition: all 0.12s, border-color 0.08s;
    transition: all 0.12s, border-color 0.08s;
  }
`

export interface ICheckBoxWithLabelProps {
  checkBoxId: string
  labelText: string
}

const CheckBoxWithLabel: React.FC<ICheckBoxWithLabelProps> = ({ checkBoxId, labelText }) => (
  <>
    <StyledCheckBox id={checkBoxId} type="checkbox" />
    <StyledLabel htmlFor={checkBoxId}>{labelText}</StyledLabel>
  </>
)

export default CheckBoxWithLabel
