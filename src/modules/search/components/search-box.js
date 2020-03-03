import React from "react"
import { SPACING, COLORS, TextInput, Button, Icon } from "@umich-lib/core"
import VisuallyHidden from "@reach/visually-hidden"
import { useSearch } from "./search-provider"

export default function SearchBox() {
  const [{ query }, dispatch] = useSearch()

  return (
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
        marginRight: SPACING["XL"],
        marginLeft: SPACING["S"],
        gridArea: "search-box",
        maxWidth: "42rem",
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
          hideLabel={true}
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
          <Icon icon="search" size="18" />
          <VisuallyHidden>Search</VisuallyHidden>
        </Button>
      </div>
    </form>
  )
}
