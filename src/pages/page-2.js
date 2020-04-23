/** @jsx jsx */
import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react"
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
import { motion, AnimatePresence } from "framer-motion"
import Switch from "../components/switch"

const Spacer = styled.div`
  width: 35px;
`

const AudienceStep = props => {
  const [selectedIndex, setIndex] = useState(0)
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

const PromoStep = ({ onClick = () => {} }) => {
  const BoostlySwitch = useMemo(
    () => (
      <Switch
        css={css`
          margin-left: 12px;
        `}
        onClick={onClick}
      />
    ),
    []
  )
  return (
    <Row
      space="between"
      css={css`
        height: 80px;
        padding-left: 32px;
        padding-right: 20px;
      `}
      y
    >
      <ButtonRound text="+ Create" color="black" />
      <Row y>
        <Title>Include Promo</Title>
        {BoostlySwitch}
      </Row>
    </Row>
  )
}

const MessageStep = props => {
  const [text, setText] = useState(
    "Welcome to the best cat you've ever fished from a lake!"
  )
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

const StepsContext = createContext()

const generateId = () => {
  let id = 1
  return () => {
    return id++
  }
}

const StepForm = props => {
  const [currentStep, setStep] = useState(1)
  const [moveUp, setMoveUp] = useState(false)
  const [childState, setChildState] = useState({})
  const [childrenCount, setChildrenCount] = useState(0)
  const [title, setTitle] = useState("")

  useEffect(() => {
    setChildrenCount(React.Children.toArray(props.children).length)
  }, [props.children])

  useEffect(() => {
    // Get value of title, if any
    const child = React.Children.toArray(props.children)[currentStep - 1]
    const title = child.props.title
    setTitle(title)
    setMoveUp(currentStep === childrenCount || !title)
  }, [currentStep, childrenCount])

  const handleNext = () => {
    setStep(prev => (prev % childrenCount) + 1)
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
                onClick={props.onBack}
              />
            }
            center={
              <AnimatePresence exitBeforeEnter>
                {currentStep !== childrenCount ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="steps"
                  >
                    <Steps
                      steps={childrenCount}
                      currentStep={currentStep}
                      onSelect={setStep}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="title"
                  >
                    <Title
                      css={css`
                        color: white;
                        font-size: 20px;
                      `}
                    >
                      {title}
                    </Title>
                  </motion.div>
                )}
              </AnimatePresence>
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
            {title && currentStep !== childrenCount && (
              <Title
                css={css`
                  color: white;
                  font-size: 20px;
                  margin-top: 20px;
                `}
              >
                {title}
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
              <StepsContext.Provider
                value={{
                  currentStep: currentStep,
                  currentStepIndex: currentStep - 1,
                  onStepChange: setStep,
                  generateId: generateId(),
                  getIndex: id => {
                    return React.Children.toArray(props.children).findIndex(
                      child => {
                        console.log(
                          `id: ${id} child.props.id=${child.props.id}`
                        )
                        return child.props.id === id
                      }
                    )
                  },
                  onNext: handleNext,
                }}
              >
                {props.children}
              </StepsContext.Provider>
            </Drawer>
          </Col>
        </Container>
      )}
    </SpecialShell>
  )
}

const Step = props => {
  const context = useContext(StepsContext)
  const id = context.generateId()
  const index = context.getIndex(props.id)
  return index === context.currentStepIndex ? props.children : null
}

const Page2 = () => {
  const [includePromo, setPromo] = useState(false)

  return (
    <StepForm onBack={() => setPromo(prev => !prev)}>
      <Step id="audience">
        <AudienceStep />
      </Step>
      {includePromo && (
        <Step title="What promo do you want to include?" id="promo">
          <PromoStep />
        </Step>
      )}
      <Step title="What message are we sending?" id="message">
        <PromoStep onClick={() => setPromo(prev => !prev)} />
      </Step>
      <Step title="How we doing?" id="confirmation">
        <></>
      </Step>
    </StepForm>
  )
}

export default Page2
