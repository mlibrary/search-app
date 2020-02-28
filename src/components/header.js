import React from "react"
import { Link } from "gatsby"
import { SPACING, MEDIA_QUERIES } from "@umich-lib/core"
import Navigation from "./navigation"
import Logo from "./logo"

export default function Header() {
  return (
    <header
      css={{
        margin: `${SPACING["S"]} 0`,
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
        },
      }}
    >
      <Logo size={30} />
      <Navigation />
    </header>
  )
}
