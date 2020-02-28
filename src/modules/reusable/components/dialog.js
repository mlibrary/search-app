import React from "react"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { Button, SPACING, MEDIA_QUERIES } from "@umich-lib/core"

export default function Dialog({ onDismiss, children }) {
  return (
    <DialogOverlay
      onDismiss={onDismiss}
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(16,22,26,.7);",
        zIndex: "999",
      }}
    >
      <DialogContent
        css={{
          position: "relative",
          background: "white",
          borderRadius: "2px",
          margin: SPACING["M"],
          padding: SPACING["L"],
          maxWidth: `calc(100% - ${SPACING["M"]} * 2)`,
          width: "42rem",
          [MEDIA_QUERIES.LARGESCREEN]: {
            padding: SPACING["2XL"],
            margin: "6vw auto",
          },
        }}
      >
        <Button
          kind="reset"
          onClick={onDismiss}
          css={{
            position: "absolute",
            right: 0,
            top: 0,
            textDecoration: "underline",
            padding: SPACING["S"],
            margin: SPACING["M"],
          }}
        >
          Dismiss
        </Button>
        {children}
      </DialogContent>
    </DialogOverlay>
  )
}
