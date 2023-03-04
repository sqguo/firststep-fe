import React, { useContext } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import {
  motion,
  MotionProps,
  AnimatePresence,
  useTime,
  useTransform,
} from "framer-motion";
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
} from "@mui/icons-material";
import "./homepage.scss";
import LandingPage from "./landingPage";
import HowItWorks1 from "./howItWorks1";
import HowItWorks2 from "./howItWorks2";
import HowItWorks3 from "./howItWorks3";
import { Views, homepageContext } from "./context";

const subframeProps: MotionProps = {
  transition: { duration: 0.3 },
  initial: { y: "100vh", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "calc(110px - 100vh)", opacity: 0 },
};

const subframeLandingProps: MotionProps = {
  ...subframeProps,
  initial: { y: "100vh", opacity: 0 },
}

const subframeLastFrameProps: MotionProps = {
  ...subframeProps,
  exit: { y: "100vh", opacity: 0 },
}



const floatingButtonProps: MotionProps = {
  transition: { duration: 0.6 },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Homepage = () => {
  const { currentView, goToNextView, setCurrentView } =
    useContext(homepageContext);
  const time = useTime();
  const secondaryButtonOffsetY = useTransform(time, (v) =>
    Math.max(0, Math.sin(v / 300) * 4)
  );

  return (
    <ReactScrollWheelHandler
      className="homepage"
      upHandler={() => setCurrentView(Views.LandingPage)}
      downHandler={goToNextView}
    >
      <AnimatePresence initial={false}>
        {currentView === Views.LandingPage && (
          <motion.div
            key={Views.LandingPage}
            className="homepage__subframe"
            {...subframeLandingProps}
          >
            <LandingPage />
          </motion.div>
        )}
        {currentView === Views.HowItWorks1_SignUp && (
          <motion.div
            key={Views.HowItWorks1_SignUp}
            className="homepage__subframe"
            {...subframeProps}
          >
            <HowItWorks1 />
          </motion.div>
        )}
        {currentView === Views.HowItWorks2_Matching && (
          <motion.div
            key={Views.HowItWorks2_Matching}
            className="homepage__subframe"
            {...subframeProps}
          >
            <HowItWorks2 />
          </motion.div>
        )}
        {currentView === Views.HowItWorks3_PostMatch && (
          <motion.div
            key={Views.HowItWorks3_PostMatch}
            className="homepage__subframe"
            {...subframeLastFrameProps}
          >
            <HowItWorks3 />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="homepage__floating-container">
        <AnimatePresence>
          {currentView !== Views.LandingPage && (
            <motion.div
              key="homepage-floating-button"
              style={{ y: secondaryButtonOffsetY }}
              {...floatingButtonProps}
              className="homepage__floating-container__secondary-action"
              onClick={goToNextView}
            >
              {currentView !== Views.HowItWorks3_PostMatch ? (
                <ArrowDownwardIcon style={{ marginRight: 3, fontSize: 18 }} />
              ) : (
                <ArrowUpwardIcon style={{ marginRight: 3, fontSize: 18 }} />
              )}
              {currentView !== Views.HowItWorks3_PostMatch
                ? "What happens next?"
                : "Go back"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ReactScrollWheelHandler>
  );
};

export default Homepage;
