import React from "react"
import {
  COLORS,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  SPACING,
  TYPOGRAPHY,
  Margins,
} from "@umich-lib/core"
import { useSearch, metadata_key } from "./search-provider"
import Result from "./search-result"

function DatastoreResults({ uid }) {
  const [{ results }] = useSearch()

  if (results && results[uid]) {
    return (
      <ol
        css={{
          listStyle: "decimal",
          marginTop: SPACING["M"],
        }}
      >
        {results[uid].slice(0, 10).map(r_uid => (
          <li
            key={r_uid}
            css={{
              borderBottom: `solid 1px ${COLORS.neutral[100]}`,
              paddingBottom: SPACING["M"],
              marginBottom: SPACING["M"],
            }}
          >
            <Result uid={r_uid} />
          </li>
        ))}
      </ol>
    )
  }

  return null
}

export default function SearchResults() {
  const [{ status }] = useSearch()

  if (status !== "searching") {
    return null
  }

  return (
    <section
      aria-label="results"
      css={{
        marginTop: SPACING["XS"],
      }}
    >
      <Tabs
        onChange={index => console.log("onChange", index)}
        css={{
          "> ul": {
            justifyContent: "center",
            "> li": {
              fontSize: "1.125rem",
            },
          },
        }}
      >
        <TabList>
          {Object.keys(metadata_key).map(key => (
            <Tab key={key}>{metadata_key[key].name}</Tab>
          ))}
        </TabList>
        {Object.keys(metadata_key).map(key => (
          <TabPanel key={key}>
            <DatastoreResults uid={key} />
          </TabPanel>
        ))}
      </Tabs>
    </section>
  )
}
