/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"

export default ({ text, ...props }) => (
  <button
    css={css`
      background: none;
      border: none;
      font-family: righteous;
      color: white;
      font-size: 22px;
    `}
    {...props}
  >
    {text}
  </button>
)
