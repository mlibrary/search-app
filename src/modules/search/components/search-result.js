import React from "react"
import { SPACING, COLORS } from "@umich-lib/core"
import { useSearch, metadata_key } from "./search-provider"
import { Metadata } from "../../metadata"

export default function Result({ uid }) {
  const [{ records }] = useSearch()
  const { names, datastore, metadata, ...rest } = records[uid]

  return (
    <>
      <a
        href={`https://search.lib.umich.edu/${metadata_key[datastore].slug}/record/${rest.uid}`}
        css={{
          color: COLORS.teal["400"],
          fontWeight: "700",
          fontSize: "1.20rem",
          textDecoration: "underline",
          textDecorationColor: COLORS.teal["200"],
          textDecorationThickness: "2px",
          textUnderlineOffset: "3px",
          ":hover, :focus": {
            textDecorationColor: COLORS.teal["400"],
          },
          marginBottom: SPACING["S"],
        }}
      >
        {[].concat(names).map((name, i) => (
          <span key={i + name}>{name}</span>
        ))}
      </a>

      <div
        css={{
          marginTop: SPACING["XS"],
        }}
      >
        <Metadata data={metadata["medium"]} />
      </div>
    </>
  )
}
