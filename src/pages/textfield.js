/**@jsx jsx*/
import React from "react"
import { css, jsx } from "@emotion/core"
import colors from "../utils/colors"

const TextField = ({ className, ...props }) => {
  return (
    <textarea
      className={className}
      css={css`
        border: 1px solid ${colors.bordergray};
        border-radius: 20px;
        width: 100%;
        resize: none;
        padding: 12px 20px;
        font-size: 16px;
        background-color: ${colors.lightblue};
        color: ${colors.darkgray};
        :focus {
          outline: none;
        }
        font-family: proxima nova;
      `}
      {...props}
    ></textarea>
  )
}

export default TextField
