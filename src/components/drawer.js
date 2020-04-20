/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"
import { motion } from "framer-motion"

const Drawer = ({ children, height = "600px", ...props }) => (
  <motion.section
    css={css`
      background-color: white;
      border-radius: 30px 30px 0px 0px;
      height: ${height};
      width: 100%;
      overflow: hidden;
    `}
    animate={{ height: height }}
    {...props}
  >
    {children}
  </motion.section>
)

export default Drawer
