/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"

export default ({ text, imageUrl, ...props }) => (
  <button
    css={css`
      border: none;
      background: none;
      background-image: url(${imageUrl});
      background-position: center;
      background-repeat: no-repeat;
      background-size: 20px;
      height: 30px;
      width: 20px;
    `}
    {...props}
  />
)