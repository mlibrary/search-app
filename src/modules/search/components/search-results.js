import React from "react"
import {
  COLORS,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  SPACING,
  Margins,
  Loading,
} from "@umich-lib/core"
import { useSearch, metadata_key } from "./search-provider"
import Result from "./search-result"
import Number from "../../../components/number"

function DatastoreResults({ uid }) {
  const [{ datastores, results, status, resultMetadata }] = useSearch()

  if (results && results[uid]) {
    const { totalAvailable } = resultMetadata[uid]
    const { name } = datastores[uid]

    return (
      <React.Fragment>
        <p
          css={{
            borderBottom: `solid 1px ${COLORS.neutral[100]}`,
            paddingTop: SPACING["2XS"],
            paddingBottom: SPACING["S"],
            marginBottom: SPACING["M"],
          }}
        >
          1 to 10 of <Number num={totalAvailable} /> {name} results
        </p>
        <ol
          css={{
            listStyle: "decimal",
            listStylePosition: "inside",
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
      </React.Fragment>
    )
  }

  if (status === "loading") {
    return (
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          margin: "10vh 0",
        }}
      >
        <Loading />
      </div>
    )
  }

  return null
}

export default function SearchResults() {
  return (
    <section aria-label="results">
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
            <Margins>
              <DatastoreResults uid={key} />
            </Margins>
          </TabPanel>
        ))}
      </Tabs>
    </section>
  )
}
