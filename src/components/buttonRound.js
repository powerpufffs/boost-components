/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"
import { Title } from "boostly-ui2/dist/components"

export default ({ text, color = "black", ...props }) => {
  return (
    <button
      css={css`
        background-color: ${color};
        border: none;
        border-radius: 999px;
        height: 25px;
        line-height: 25px;
        padding: 0px 10px;
        color: white;
        white-space: nowrap;
        box-shadow: 0px 5px 5px hsla(0, 0%, 50%, 0.2);
        box-sizing: border-box;
        font-family: righteous;
        vertical-align: text-bottom;
      `}
      {...props}
    >
      <Title
        css={css`
          font-weight: 200;
          text-align: center;
        `}
      >
        {text}
      </Title>
    </button>
  )
}
