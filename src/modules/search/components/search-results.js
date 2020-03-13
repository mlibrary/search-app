import React from "react"
import {
  COLORS,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  SPACING,
  Loading,
} from "@umich-lib/core"
import { useSearch, metadata_key } from "./search-provider"
import Result from "./search-result"
import Number from "../../../components/number"
import { Layout, LayoutFull } from "../../reusable"

function DatastoreResults({ uid }) {
  const [{ results, status, resultMetadata }] = useSearch()

  if (results && results[uid]) {
    const { totalAvailable } = resultMetadata[uid]

    return (
      <Layout>
        <LayoutFull
          css={{
            background: COLORS.blue["100"],
          }}
        >
          <Layout>
            <p
              css={{
                fontWeight: "600",
                padding: `${SPACING["S"]} 0`,
              }}
            >
              1 to 10 of <Number num={totalAvailable} /> results
            </p>
          </Layout>
        </LayoutFull>
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
      </Layout>
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
          ".react-tabs__tab-panel": {
            padding: "0",
          },
          ".react-tabs__tab-list": {
            paddingTop: SPACING["2XS"],
            background: "white",
            position: "sticky",
            top: "0",
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
