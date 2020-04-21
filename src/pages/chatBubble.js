/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"

const ChatBubble = ({ color = "hsl(212, 100%, 63%)", className, children }) => (
  <div
    css={css`
      padding: 12px 20px;
      background-color: ${color};
      color: white;
      border-radius: 20px 20px 0px 20px;
      box-shadow: 0px 3px 10px hsla(0, 0%, 40%, 0.3),
        0px 5px 5px hsla(0, 0%, 5%, 0.1);
      line-height: 24px;
    `}
    className={className}
  >
    {children}
  </div>
)

export default ChatBubble
