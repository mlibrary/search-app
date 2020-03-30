import React from "react"

export default function LayoutFull({ children, ...rest }) {
  return (
    <div
      css={{
        gridColumn: "full",
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
