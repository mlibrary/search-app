import React from "react"

export const onClientEntry = () => {
  const {
    applyPolyfills,
    defineCustomElements,
  } = require("@umich-lib/components/loader")

  applyPolyfills().then(() => {
    defineCustomElements(window)
  })
}

export const wrapPageElement = ({ element }) => {
  return (
    <React.Fragment>
      <m-universal-header></m-universal-header>
      {element}
      <m-chat></m-chat>
    </React.Fragment>
  )
}
