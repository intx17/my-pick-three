import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import Footer from '../components/organisms/Footer'
import styled from '@emotion/styled'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const IndexLayout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <StyledRootDiv>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords }
          ]}
        />
        <StyledMain>{children}</StyledMain>
        <Footer />
      </StyledRootDiv>
    )}
  />
)

export default IndexLayout
