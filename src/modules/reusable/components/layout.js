import React from "react"
import { SPACING, MEDIA_QUERIES } from "@umich-lib/core"

export default function Layout({ children, ...rest }) {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: `[full-start] minmax(${SPACING["M"]}, 1fr)
                              [main-start] minmax(0, 1200px) [main-end]
                              minmax(${SPACING["M"]}, 1fr) [full-end]`,
        [MEDIA_QUERIES.LARGESCREEN]: {
          gridTemplateColumns: `[full-start] minmax(${SPACING["2XL"]}, 1fr)
                              [main-start] minmax(0, 1200px) [main-end]
                              minmax(${SPACING["M"]}, 1fr) [full-end]`,
        },
        "> *": {
          gridColumn: "main",
        },
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
