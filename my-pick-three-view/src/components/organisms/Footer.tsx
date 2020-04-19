import * as React from 'react'
import styled from '@emotion/styled'

const StyledFooter = styled.footer`
  width: 100%;
  height: 50px;
  text-align: center;
`

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: table;
  > li:first-child {
    border-right: 1px solid #fff;
  }
`

const StyledLi = styled.li`
  width: 50%;
  display: table-cell;
  vertical-align: middle;
  background-color: #008b8b;
  &:active {
    opacity: 0.7;
  }
  color: white;
`

const Footer: React.FC = () => (
  <StyledFooter>
    <StyledUl>
      <StyledLi>TOP</StyledLi>
      <StyledLi>登録</StyledLi>
    </StyledUl>
  </StyledFooter>
)

export default Footer
