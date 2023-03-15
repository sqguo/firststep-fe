import React, { useEffect, useState } from "react";
import { motion, MotionProps } from "framer-motion";
import Clock from "react-clock";
import 'react-clock/dist/Clock.css';
import "./howItWorks2.scss";

const HowItWorks2 = () => {
  const [clockTime, setClockTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setClockTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderContent = () => {
    return (
      <div className="how-it-works-2__content-wrapper">
        <div className="how-it-works-2__content">
          <div className="how-it-works-2__content__clipart">
            <Clock value={clockTime} size={200} />
          </div>
          <div className="how-it-works-2__content__text-container">
            <div className="how-it-works-2__content__text-container__title">
              The hardest part...
            </div>
            <div className="how-it-works-2__content__text-container__description">
              Our platform runs a highly sophisticated matching algorithm under
              the hood{" "}
              <span style={{ fontSize: 7 }}>
                (so sophisticated, in fact, that we have no idea how it works)
              </span>
              . This process can take some time, but it's well worth the wait.
              We want to ensure that you're matched with a team that's a great
              fit for your project, so we take the time to carefully analyze all
              available options.
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBackground = () => {
    return (
      <div className="how-it-works-2__background">
        <div className="how-it-works-2__background__animation-wrapper"></div>
      </div>
    );
  };

  return (
    <div className="how-it-works-2">
      {renderBackground()}
      {renderContent()}
    </div>
  );
};

export default HowItWorks2;
