import React from "react"
import { SPACING, MEDIA_QUERIES, Margins } from "@umich-lib/core"
import Navigation from "./navigation"
import Logo from "./logo"
import { SearchBox } from "../modules/search"

export default function Header() {
  return (
    <Margins>
      <header
        css={{
          marginTop: SPACING["S"],
          marginBottom: SPACING["2XS"],
          alignItems: "center",
          "> *:first-child": {
            marginBottom: SPACING["S"],
          },
          [MEDIA_QUERIES.LARGESCREEN]: {
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            "> *:first-child": {
              margin: 0,
            },
            flexWrap: "nowrap",
          },
        }}
      >
        <Logo size={30} />
        <SearchBox />
        <Navigation />
      </header>
    </Margins>
  )
}
