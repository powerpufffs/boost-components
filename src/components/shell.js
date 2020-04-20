import React from "react"
// import PropTypes from 'prop-types'
import styled from "@emotion/styled"
import { Box, settings } from "boostly-ui2"
const Container = styled(Box)`
  position: relative;
  max-width: 450px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: black;
`
const Shell = React.forwardRef(({ children }, ref) => (
  <div ref={ref}>{children({ Container })}</div>
))
Shell.propTypes = {
  // children: PropTypes.node.isRequired
}
export default Shell
