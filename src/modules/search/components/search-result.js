import React from "react"
import { Link, SPACING, COLORS } from "@umich-lib/core"
import { useSearch, metadata_key } from "./search-provider"
import { Metadata } from "../../metadata"

export default function Result({ uid }) {
  const [{ records }] = useSearch()
  const { names, datastore, metadata } = records[uid]

  return (
    <>
      <Link
        href={`https://search.lib.umich.edu/${metadata_key[datastore].slug}/record/${uid}`}
        css={{
          display: "inline-block",
          fontWeight: "700",
          fontSize: "1.20rem",
          textDecoration: "underline",
          textDecorationColor: COLORS.teal["200"],
          textDecorationThickness: "2px",
          textUnderlineOffset: "3px",
          ":hover": {
            textDecorationColor: COLORS.teal["400"],
          },
          boxShadow: "none",
          marginBottom: SPACING["S"],
        }}
      >
        {[].concat(names).map((name, i) => (
          <span key={i + name}>{name}</span>
        ))}
      </Link>

      <Metadata data={metadata["medium"]} />
    </>
  )
}
