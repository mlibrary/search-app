import React from "react"
import { Link } from "gatsby"
import { SPACING, TYPOGRAPHY, COLORS } from "@umich-lib/core"
import Navigation from "./navigation"
import Logo from "./logo"

export default function Header() {
  return (
    <header
      css={{
        margin: `${SPACING["S"]} 0`,
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
      }}
    >
      <Logo size={30} />
      <Navigation />
    </header>
  )
}
