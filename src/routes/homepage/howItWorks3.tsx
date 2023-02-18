import React, { useEffect, useState } from "react";
import { motion, MotionProps } from "framer-motion";
import { Person as PersonIcon } from '@mui/icons-material';
import "./howItWorks3.scss";

const clipcart = require("../../assets/manygoose.png");

const HowItWorks3 = () => {
  const [clockTime, setClockTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setClockTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderContent = () => {
    return (
      <div className="how-it-works-3__content-wrapper">
        <div className="how-it-works-3__content">
          <div className="how-it-works-3__content__clipart">
            <img src={clipcart} />
          </div>
          <div className="how-it-works-3__content__text-container">
            <div className="how-it-works-3__content__text-container__title">
              PIP or get Piped;
            </div>
            <div className="how-it-works-3__conten__text-container__description">
              Once you've been matched with a team, you'll be able to chat with
              your potential team members through our platform. Take this time
              to get to know your team members better, ask questions, and
              brainstorm project ideas. At last, you may choose to commit to the
              team permanently or opt into the next round of matching.
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBackground = () => {
    return (
      <div className="how-it-works-3__background">
        <div className="how-it-works-3__background__animation-wrapper"></div>
      </div>
    );
  };

  return (
    <div className="how-it-works-3">
      {renderBackground()}
      {renderContent()}
    </div>
  );
};

export default HowItWorks3;
