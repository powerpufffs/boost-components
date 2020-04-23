/** @jsx jsx */
import React, { useState } from "react"
import styled from "@emotion/styled"
import { css, jsx } from "@emotion/core"
import colors from "../utils/colors"
import { motion } from "framer-motion"
import { Title } from "boostly-ui2/dist/components"

const CustomInput = css`
  opacity: 0;
  height: 0;
  width: 0;
`
const BoostlySwitch = styled.div`
  height: 30px;
  width: 75px;
  border-radius: 999px;
  background: ${colors.dividerblue};
  border: 1px solid ${colors.bordergray};
  display: flex;
  position: relative;
`

const Switch = ({ onClick, ...props }) => {
  const [isOn, isOff] = useState(false)
  const handleClick = () => {
    isOff(prev => !prev)
    onClick()
  }
  return (
    <BoostlySwitch onClick={handleClick} {...props}>
      <motion.div
        css={css`
          position: absolute;
          height: 100%;
          left: 8px;
          right: 8px;
        `}
        //   animate={{ x: isOn ? 0 : 34 }}
        animate={{
          x: isOn ? [34, 0, 0, 0] : [0, 34, 34, 34],
          opacity: isOn ? [0, 0, 0.8, 1] : [0, 0, 0.9, 1],
          // color: isOn ? "rebeccapurple" : "black",
        }}
        transition={{ duration: 1 }}
      >
        <Title
          css={css`
            display: flex;
            align-items: center;
            height: 100%;
          `}
        >
          {isOn ? "YES" : "NO"}
        </Title>
      </motion.div>
      <motion.div
        animate={{
          x: isOn ? 42 : 0,
          rotate: isOn ? 360 : 0,
          filter: `grayscale(${isOn ? "0%" : "100%"})`,
        }}
        css={css`
          height: auto;
          width: auto;
          padding: 0px 4px;
          display: flex;
          align-items: center;
        `}
      >
        <img
          src={require("../images/boostly-icon.png")}
          css={css`
            margin: 0px;
            padding: 0px;
            height: 24px;
            width: 24px;
          `}
        />
      </motion.div>
    </BoostlySwitch>
  )
}

export default Switch
