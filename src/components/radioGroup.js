/** @jsx jsx */
import React, { useState } from "react"
import styled from "@emotion/styled"
import { css, jsx } from "@emotion/core"
import { Title } from "boostly-ui2"
import colors from "../utils/colors"

const CheckMark = styled.div`
  font-weight: bold;
  font-family: righteous;
  position: absolute;
  left: 10px;
`

export const RadioGroup = ({
  data,
  defaultIndex,
  selectedIndex,
  onSelect = _ => _,
  ...props
}) => {
  const handleSelect = i => {
    onSelect(i)
  }
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {data.map((row, i) => {
        return (
          <div
            role="button"
            key={`${row}${i}`}
            css={css`
              display: flex;
              background: ${i === selectedIndex
                ? colors.lightblue
                : "white"};
              height: auto;
              padding: 12px 12px;
              padding-right: 20px;
              font-size: 18px;
              font-weight: 400;
              padding-left: 34px;
              border-top: 0.1px solid ${colors.dividerblue};
              justify-content: space-between;
              align-items: center;
              position: relative;
              font-family: righteous;
            `}
            onClick={() => {
              handleSelect(i)
            }}
          >
            <CheckMark>{i === selectedIndex && "✓"}</CheckMark>
            <Title>{row.label}</Title>
            {row.value && <Title>{row.value}</Title>}
          </div>
        )
      })}
    </div>
  )
}
