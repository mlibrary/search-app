import React from "react"
import { SPACING, COLORS, TYPOGRAPHY } from "@umich-lib/core"
import { ChooseAffiliation } from "../modules/affiliation"

export default function Navigation() {
  return (
    <ul
      css={{
        display: "flex",
        "> li": {
          ":not(:last-of-type)": {
            marginRight: SPACING["L"],
          },
        },
      }}
    >
      <li>Account</li>
      <li>Favorites</li>
      <li>Log in</li>

      <li>
        <ChooseAffiliation />
      </li>
    </ul>
  )
}
