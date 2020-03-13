import React from "react"

const numeral = require("numeral")

export default function Numeral({ num }) {
  const formatted = numeral(num).format("0,0")

  return <React.Fragment>{formatted}</React.Fragment>
}
