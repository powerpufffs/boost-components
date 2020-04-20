/** @jsx jsx */
import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { css, jsx } from "@emotion/core"
import { Row, Box, Col } from "boostly-ui2"
import Drawer from "../components/drawer"

import Image from "../components/image"
import SEO from "../components/seo"

const Background = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`

const Layout = styled.div`
  width: 450px;
  min-height: 100%;
  background: black;
  display: flex;
  justify-content: center;
  position: relative;
`

const Spacer = styled.div`
  width: 35px;
`
const Steps = ({ steps, currentStep, onSelect, ...props }) => {
  const selectedState = css`
    ::before {
      content: "";
      border: 2px solid white;
      border-radius: 999px;
      position: absolute;
      width: 50px;
      height: 50px;
      left: 50%;
      top: 55%;
      transform: translate(-50%, -50%);
    }
  `
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      {[...Array(steps).keys()].map(e => {
        const step = e + 1
        return (
          <>
            {e > 0 && <Spacer />}
            <div
              css={css`
                position: relative;
                color: white;
                font-size: 24px;
                font-family: righteous;
                ${currentStep === step && selectedState}
              `}
              onClick={() => onSelect(step)}
            >
              {step}
            </div>
          </>
        )
      })}
    </div>
  )
}

const Header = ({
  children,
  backDestination = null,
  onRightButtonClick = _ => _,
}) => {
  const handleBack = () => {
    window.location.href = backDestination
  }
  return (
    <header
      css={css`
        height: 80px;
        width: 100%;
        display: grid;
        grid-template-columns:
          minmax(20%, 50px)
          1fr
          minmax(20%, 50px);
        align-items: center;
        justify-items: center;
      `}
    >
      {backDestination && (
        <button
          css={css`
            border: none;
            background: none;
            background-image: url(${require("../images/BackArrow.svg")});
            background-position: center;
            background-repeat: no-repeat;
            background-size: 20px;
            height: 30px;
            width: 20px;
          `}
          onClick={handleBack}
        />
      )}
      {children}
      <button
        css={css`
          font-family: righteous;
          color: white;
          font-size: 22px;
        `}
        onClick={onRightButtonClick}
      >
        next
      </button>
    </header>
  )
}



const Index = () => <Form />

const Form = ({ steps, ...props }) => {
  const [selectedIndex, setIndex] = useState(1)
  return (
    <Background>
      <Layout>
        <Header
          backDestination={"hello"}
          onRightButtonClick={() => setIndex(prev => (prev % 4) + 1)}
        >
          <Steps steps={4} currentStep={selectedIndex} onSelect={setIndex} />
        </Header>
        <Drawer>
          <div>hello</div>
        </Drawer>
      </Layout>
    </Background>
  )
}

export default Index

//API considerations
//  preset heights for bottom drawer
//  number of form steps
//  destination of back button
