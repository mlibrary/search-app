import React from "react"
import PropTypes from "prop-types"
import { Global } from "@emotion/core"
import { GlobalStyleSheet, UniversalHeader, COLORS } from "@umich-lib/core"
import { SearchProvider } from "../modules/search"
import Footer from "../components/footer"
import Header from "../components/header"

const Layout = props => (
  <>
    <Global
      styles={{
        "html, body, #___gatsby, #___gatsby > div": {
          height: "100%",
        },
        "*:focus": {
          boxShadow: `0 0 0 2px ${COLORS.maize["400"]},0 0 0 3px ${COLORS.neutral["400"]}`,
          borderRadius: "2px",
          outline: 0,
        },
        "#gatsby-focus-wrapper:focus": {
          boxShadow: "none",
        },
      }}
    />
    <GlobalStyleSheet />
    <div
      css={{
        minHeight: "100%",
        display: "grid",
        gridTemplateRows: "auto auto 1fr auto",
        gridTemplateColumns: "100%",
      }}
    >
      <UniversalHeader />
      <SearchProvider>
        <Header />
        {props.children}
      </SearchProvider>
      <Footer />
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
