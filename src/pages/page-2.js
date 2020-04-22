/** @jsx jsx */
import React, { useState, useEffect, useMemo } from "react"
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { Row, Col, Box, settings, Arrow, Title } from "boostly-ui2"
import Shell from "../components/shell"
import Drawer from "../components/drawer"
import TextButton from "../components/textButton"
import ImageButton from "../components/imageButton"
import { RadioGroup } from "../components/radioGroup"
import ButtonRound from "../components/buttonRound"
import ChatBubble from "./chatBubble"
import TextField from "./textfield"

const Spacer = styled.div`
  width: 35px;
`

const AudienceStep = ({ onSelect, onChange }) => {
  const [selectedIndex, setIndex] = useState(0)
  useEffect(() => {
    onChange(data[selectedIndex])
  }, [selectedIndex])
  const data = useMemo(
    () => [
      {
        label: "All Subscribers",
        value: "250",
      },
      {
        label: "3pd Subscribers",
        value: "355",
      },
      {
        label: "Best Customers",
        value: "22",
      },
    ],
    []
  )
  return (
    <>
      <Row
        y
        css={css`
          height: 60px;
          padding-left: 34px;
          padding-right: 20px;
        `}
        space="between"
      >
        <ButtonRound text="+ Create" color="black" onClick={() => {}} />
        <img
          src={require("../images/group.svg")}
          css={css`
            margin: 0px;
          `}
        />
      </Row>
      <RadioGroup
        data={data}
        defaultIndex={0}
        selectedIndex={selectedIndex}
        onSelect={setIndex}
      />
    </>
  )
}

const MessageStep = ({ onChange }) => {
  const [text, setText] = useState(
    "Welcome to the best cat you've ever fished from a lake!"
  )
  useEffect(() => {
    onChange(text)
  }, [text])
  return (
    <Col>
      <div
        css={css`
          padding: 20px 20px;
        `}
      >
        <ChatBubble>
          <Title>
            <p>{text}</p>
            Reply STOP to end msg&data rates may apply
          </Title>
        </ChatBubble>
        <TextField
          css={css`
            margin-top: 20px;
            height: 80px;
          `}
          placeholder={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
    </Col>
  )
}

const NavHeight = 80
const Nav = ({ goBackTo, left, center, right }) => (
  <nav
    css={css`
      height: ${NavHeight}px;
      width: 100%;
      display: grid;
      grid-template-columns:
        minmax(auto, 20%)
        1fr
        minmax(auto, 20%);
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
          <React.Fragment key={step}>
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
          </React.Fragment>
        )
      })}
    </div>
  )
}

const StepForm = ({ states, onNext, onSubmit }) => {
  const [currentStep, setStep] = useState(1)
  const [moveUp, setMoveUp] = useState(false)
  const [childState, setChildState] = useState({})

  useEffect(() => {
    setMoveUp(currentStep === states.length || !states[currentStep - 1].title)
  }, [currentStep])

  const handleNext = () => {
    setStep(prev => (prev % 3) + 1)
    onNext({ step: currentStep, data: childState })
  }

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
            left={
              <ImageButton
                imageUrl={require("../images/BackArrow.svg")}
                onClick={() => setStep(1)}
              />
            }
            center={
              currentStep !== states.length ? (
                <Steps steps={3} currentStep={currentStep} onSelect={setStep} />
              ) : (
                <Title
                  css={css`
                    color: white;
                    font-size: 20px;
                  `}
                >
                  {states[currentStep - 1].title}
                </Title>
              )
            }
            right={<TextButton text="next" onClick={handleNext} />}
          />
          <Col
            css={css`
              flex-grow: 1;
            `}
            height="100%"
            x
          >
            {states[currentStep - 1].title && currentStep !== states.length && (
              <Title
                css={css`
                  color: white;
                  font-size: 20px;
                  margin-top: 20px;
                `}
              >
                {states[currentStep - 1].title}
              </Title>
            )}
            <Drawer
              height={`calc(100% - ${
                moveUp ? `${NavHeight}px` : `${NavHeight * 2}px`
              })`}
              css={css`
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
              `}
            >
              {states[currentStep - 1].view({
                step: states[currentStep - 1].step,
                onChange: setChildState,
              }) || null}
            </Drawer>
          </Col>
        </Container>
      )}
    </SpecialShell>
  )
}

const states = [
  {
    step: 1,
    title: "Who is the intended audience?",
    view: ({ ...props }) => <AudienceStep {...props} />,
  },
  {
    step: 2,
    title: "What message are we sending?",
    view: ({ ...props }) => <MessageStep {...props} />,
  },
  {
    step: 3,
    title: "How do we look?",
    view: () => <></>,
  },
]

const Page2 = () => {
  const [payload, setPayload] = useState({})
  const handleNext = ({ step, data }) => {
    console.log(`step: ${step}`)
    console.log(data)
    switch (step) {
      case states[0].step:
      //handle the data
      case states[1].step:
      //like save it to a shared payload
      case states[2].step:
      //or put it into global context
      default:
        break
    }
  }
  const handleSubmit = () => {
    // Form indicates that it has reached the end of the form
  }
  return (
    <StepForm states={states} onNext={handleNext} onSubmit={handleSubmit} />
  )
}

export default Page2
