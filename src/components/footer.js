import React from "react"
import { COLORS, Link, Margins, SPACING, MEDIA_QUERIES } from "@umich-lib/core"

export default function Footer() {
  const now = new Date()
  const year = now.getFullYear()

  return (
    <footer
      css={{
        marginTop: SPACING["4XL"],
        background: COLORS.blue["400"],
        color: "white",
      }}
    >
      <Margins>
        <ul
          css={{
            paddingTop: SPACING["XL"],
            "> *": {
              ":not(:last-of-type)": {
                marginBottom: SPACING["S"],
              },
            },
          }}
        >
          <li>Home</li>
          <li>Accessibility</li>
          <li>Tips for using Library Search</li>
          <li>Get research help</li>
          <li>Technical overview</li>
          <li>Make an I.L.L. request</li>
        </ul>
      </Margins>
      <div
        css={{
          background: COLORS.blue["500"],
          marginTop: SPACING["XL"],
        }}
      >
        <Margins>
          <p
            css={{
              padding: `${SPACING["M"]} 0`,
            }}
          >
            <span
              css={{
                display: "block",
                marginBottom: SPACING["XS"],
                [MEDIA_QUERIES.LARGESCREEN]: {
                  display: "inline",
                  marginRight: SPACING["2XL"],
                },
              }}
            >
              © {year}, Regents of the University of Michigan
            </span>
            <span>
              Built with the{" "}
              <Link href="design-system.lib.umich.edu/" kind="light">
                U-M Library Design System
              </Link>
            </span>
          </p>
        </Margins>
      </div>
    </footer>
  )
}
