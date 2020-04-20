/** @jsx jsx */
import React, { useState } from "react"
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { Row, Col, Box, settings, Arrow, Title } from "boostly-ui2"
import Shell from "../components/shell"
import Drawer from "../components/drawer"
import TextButton from "../components/textButton"
import ImageButton from "../components/imageButton"

const Spacer = styled.div`
  width: 35px;
`

const NavHeight = 80
const Nav = ({ goBackTo, left, center, right }) => (
  <nav
    css={css`
      height: ${NavHeight}px;
      width: 100%;
      display: grid;
      grid-template-columns:
        minmax(auto, 33%)
        1fr
        minmax(auto, 33%);
      grid-template-areas: "left center right";
      align-items: center;
      justify-items: center;
    `}
  >
    <Row
      w="33%"
      css={css`
        grid-area: left;
      `}
    >
      {goBackTo ? (
        <a href={goBackTo}>
          <Arrow color={settings.colors.purple} direction="left" />
        </a>
      ) : (
        left
      )}
    </Row>
    <div
      css={css`
        grid-area: center;
      `}
    >
      {center}
    </div>
    <div
      css={css`
        grid-area: right;
      `}
    >
      {right}
    </div>
  </nav>
)

const SpecialShell = ({ children }) => (
  <Shell>
    {({ Container }) => (
      <Box>{children({ Nav, NavHeight, Container, Drawer })}</Box>
    )}
  </Shell>
)

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

const Page2 = () => {
  const [selectedIndex, setIndex] = useState(1)
  return (
    <SpecialShell>
      {({ Nav, NavHeight, Container, Drawer }) => (
        <Container
          css={css`
            height: 100%;
            display: flex;
            flex-direction: column;
          `}
        >
          <Nav
            left={<ImageButton imageUrl={require("../images/BackArrow.svg")} />}
            right={
              <TextButton
                text="next"
                onClick={() => setIndex(prev => (prev % 3) + 1)}
              />
            }
            center={
              <Steps
                steps={3}
                currentStep={selectedIndex}
                onSelect={setIndex}
              />
            }
          />
          <Col
            css={css`
              flex-grow: 1;
            `}
            height="100%"
            x
          >
            {selectedIndex !== 2 && (
              <Title
                css={css`
                  color: white;
                  font-size: 20px;
                  margin-top: 20px;
                `}
              >
                Who is the intended audience?
              </Title>
            )}
            <Drawer
              height={`calc(100% - ${selectedIndex !== 2 ? "160px" : "80px"})`}
              css={css`
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
              `}
            />
          </Col>
        </Container>
      )}
    </SpecialShell>
  )
}

export default Page2
