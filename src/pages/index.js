import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { SearchBox, SearchResults } from "../modules/search"

const IndexPage = () => (
  <Layout>
    <SEO title="Search" />
    <SearchResults />
  </Layout>
)

export default IndexPage
