import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { Dialog } from "../../reusable"
import { useCookies } from "react-cookie"
import qs from "qs"
import {
  Button,
  Heading,
  Text,
  Icon,
  SPACING,
  MEDIA_QUERIES,
  TYPOGRAPHY,
  COLORS,
} from "@umich-lib/core"

export default function ChooseAffiliation() {
  const [cookies] = useCookies(["affiliation"])
  const [open, setOpen] = useState(false)

  let affiliation = "aa"

  if (cookies["affiliation"]) {
    affiliation = cookies["affiliation"]
  }

  const label = "Ann Arbor"
  const alternativeAffiliation = affiliation === "aa" ? "flint" : "aa"
  const alternativeLabel = "Flint"

  function changeAffiliation() {
    const parsed = qs.parse(document.location.search.substring(1), {
      allowDots: true,
    })
    const withAffiliation = {
      ...parsed,
      affiliation: alternativeAffiliation,
    }

    document.location.href =
      document.location.pathname +
      "?" +
      qs.stringify(withAffiliation, {
        arrayFormat: "repeat",
        encodeValuesOnly: true,
        allowDots: true,
        format: "RFC1738",
      })
  }

  return (
    <React.Fragment>
      <Button kind="reset" onClick={() => setOpen(true)}>
        <VisuallyHidden>Choose campus affiliation: </VisuallyHidden>
        <span
          css={{
            marginRight: SPACING["2XS"],
          }}
        >
          {label}
        </span>
        <Icon icon="expand_more" />
      </Button>
      {open && (
        <Dialog onDismiss={() => setOpen(false)}>
          <div
            css={{
              [MEDIA_QUERIES.LARGESCREEN]: {
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              },
            }}
          >
            <Heading
              size="M"
              css={{
                marginBottom: SPACING["S"],
                marginRight: SPACING["4XL"],
                fontWeight: "700",
              }}
            >
              Choose campus affiliation
            </Heading>
          </div>
          <Text
            css={{
              marginBottom: SPACING["M"],
            }}
          >
            Selecting an affiliation helps us connect you to available online
            materials licensed for your campus.
          </Text>

          <div
            css={{
              display: "flex",
              alignItems: "baseline",
              marginBottom: SPACING["M"],
            }}
          >
            <Button onClick={() => setOpen(false)} kind="primary">
              Continue as {label}
            </Button>
            <span
              css={{
                margin: `${SPACING["2XS"]} 0`,
                [MEDIA_QUERIES.LARGESCREEN]: {
                  margin: `0 ${SPACING["S"]}`,
                },
              }}
            >
              or
            </span>
            <Button kind="subtle" onClick={changeAffiliation} role="link">
              Change to {alternativeLabel}
            </Button>
          </div>

          <Text css={{ marginBottom: "0" }} small>
            You can still use Library Search if you're not affiliated with
            either campus.
          </Text>
        </Dialog>
      )}
    </React.Fragment>
  )
}
