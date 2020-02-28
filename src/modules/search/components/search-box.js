import React from "react"
import {
  Margins,
  SPACING,
  COLORS,
  TextInput,
  Button,
  Icon,
} from "@umich-lib/core"
import { useSearch } from "./search-provider"
import Img from "../../../components/image"

export default function SearchBox() {
  const [{ query, status }, dispatch] = useSearch()

  return (
    <>
      {status !== "searching" && (
        <Img
          css={{
            maxWidth: "480px",
            margin: "0 auto",
            marginTop: "10vh",
          }}
        />
      )}
      <form
        aria-label="search box"
        onSubmit={e => {
          e.preventDefault()

          dispatch({
            type: "setRun",
            run: true,
          })
        }}
        css={{
          width: "100%",
          margin: "0 auto",
          gridArea: "search-box",
          maxWidth: "42rem",
          marginTop: SPACING["M"],
        }}
      >
        <div
          css={{
            display: "flex",
            alignItems: "flex-end",
            input: {
              height: "40px",
              borderColor: COLORS.neutral["300"],
            },
          }}
        >
          <TextInput
            id="search-query"
            labelText="Search for books, articles, and more"
            hideLabel={status === "searching"}
            type="search"
            name="query"
            value={query}
            onChange={e => {
              dispatch({ type: "setQuery", query: e.target.value })
            }}
          />
          <Button
            type="submit"
            kind="primary"
            css={{
              whiteSpace: "nowrap",
              marginLeft: SPACING["XS"],
            }}
          >
            <Icon icon="search" size="18" />{" "}
            <span
              css={{
                marginLeft: SPACING["2XS"],
              }}
            >
              Search
            </span>
          </Button>
        </div>
      </form>
    </>
  )
}
