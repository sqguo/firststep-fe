import React, { useContext } from "react";
import { Button } from "@mui/material";
import { ArrowDownward as ArrowDownwardIcon } from "@mui/icons-material";
import { motion, useTime, useTransform } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import { range } from "lodash";
import "./landingPage.scss";
import { homepageContext } from "./context";
import useUserProfile from "../../common/hooks/useUserProfile";
import history from "../../history";

const NUM_GOOSE_PROFILES = 11;
const NUM_REQUIRED = 33;
const ANGLE_INCREMENT = 360 / NUM_REQUIRED;
const INITIAL_ANGLE_OFFSET = 5;
const FULL_ROTATION_DURATION = 100;

const placeholderProfiles: string[] = range(0, NUM_GOOSE_PROFILES).map((i) => {
  return require("../../assets/goose/goose-profile" + String(i) + ".png");
});
const animationProfiles: string[] = range(0, NUM_REQUIRED).map((i) => {
  return placeholderProfiles[i % NUM_GOOSE_PROFILES];
});

interface AnimatedProfileProps {
  index: number;
  profile: string;
}

const AnimatedProfile = (props: AnimatedProfileProps) => {
  const { index, profile } = props;
  const angleOffset = index * ANGLE_INCREMENT + INITIAL_ANGLE_OFFSET;
  const time = useTime();
  const rotate = useTransform(
    time,
    [0, FULL_ROTATION_DURATION * 1000],
    [0, 360],
    { clamp: false }
  );
  const rotateZ = useTransform(rotate, (v) => (angleOffset + v) % 360);
  const rotateCorrection = useTransform(rotateZ, (v) => -v);
  const opacity = useTransform(
    rotateZ,
    [0, 20, 40, 320, 340, 360],
    [1, 1, 0, 0, 1, 1]
  );

  return (
    <motion.div
      key={index}
      style={{ rotateZ }}
      className="landing-page__background__profile-wrapper"
    >
      <motion.div style={{ rotate: rotateCorrection, opacity }}>
        <img className="landing-page__background__profile" src={profile} />
      </motion.div>
    </motion.div>
  );
};

const LandingPage = () => {
  const { goToNextView } = useContext(homepageContext);
  const { loginWithRedirect } = useAuth0();
  const { isLoggedIn, isOnboardingCompleted } = useUserProfile();
  const time = useTime();
  const secondaryButtonOffsetY = useTransform(time, (v) =>
    Math.max(0, Math.sin(v / 300) * 4)
  );

  const onClickGetStarted = () => {
    if (isLoggedIn) {
      if (isOnboardingCompleted) {
        history.push("/dashboard");
      } {
        history.push("/onboarding");
      }
    } else {
      loginWithRedirect();
    }
  };

  const renderContent = () => {
    return (
      <div className="landing-page__content-wrapper">
        <div className="landing-page__content">
          <div className="landing-page__content__title">Your first step</div>
          <div className="landing-page__content__title">towards the</div>
          <div className="landing-page__content__title">FYDP dream team</div>
          <div className="landing-page__content__description">
            Our platform connects you with others who share your interests and
            skills, making it easier than ever to form a successful team.
          </div>
          <div className="landing-page__content__button">
            <Button
              className="actionButton"
              variant="outlined"
              color="inherit"
              onClick={onClickGetStarted}
            >
              {isLoggedIn
                ? isOnboardingCompleted
                  ? "🚀 Check your status"
                  : "🚀 Complete onboarding"
                : "🚀 Get Started today"}
            </Button>
          </div>
          <motion.div
            style={{ y: secondaryButtonOffsetY }}
            className="landing-page__content__secondary-action"
            onClick={goToNextView}
          >
            <ArrowDownwardIcon style={{ marginRight: 3, fontSize: 18 }} />
            See our platform in action
          </motion.div>
        </div>
      </div>
    );
  };

  const renderBackground = () => {
    return (
      <div className="landing-page__background">
        <div className="landing-page__background__animation-wrapper">
          {animationProfiles.map((profile, i) => (
            <AnimatedProfile key={i} index={i} profile={profile} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="landing-page">
      {renderBackground()}
      {renderContent()}
    </div>
  );
};

export default LandingPage;
