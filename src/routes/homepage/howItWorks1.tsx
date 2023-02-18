import { random, range } from "lodash";
import { motion, MotionProps } from "framer-motion";
import CancelIcon from "@mui/icons-material/Cancel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import "./howItWorks1.scss";

const NUM_PREF_ROWS = 4;
const NUM_PREF_COLS = 6;

const prefProps: MotionProps = {
  transition: { duration: 0.6 },
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

const prefboolsInit = range(0, NUM_PREF_ROWS).map((_) => {
  return range(0, NUM_PREF_COLS).map((_) => Boolean(random(1)));
});

const HowItWorks1 = () => {
  const [prefbools, setPrefBools] = useState(prefboolsInit);

  useEffect(() => {
    const interval = setInterval(() => {
      const numRands = random(1, 2);
      const randSets = range(numRands).map((_) => {
        const randi = random(NUM_PREF_ROWS);
        const randj = random(NUM_PREF_COLS);
        return { randi, randj };
      });
      setPrefBools((p) =>
        p.map((r, i) =>
          r.map((c, j) => {
            let flip = false;
            for (var set of randSets) {
              if (set.randi === i && set.randj === j) {
                flip = true;
                break;
              }
            }
            return flip ? !c : c;
          })
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    return (
      <div className="how-it-works-1__content-wrapper">
        <div className="how-it-works-1__content">
          <div className="how-it-works-1__content__clipart">
            {prefbools.map((row, i) => {
              return (
                <div key={i} className="how-it-works-1__content__clipart__row">
                  {row.map((pref, j) => {
                    return (
                      <motion.div
                        key={"pref-" + i + "-" + j + "-" + Number(pref)}
                        {...prefProps}
                      >
                        {!pref ? (
                          <CancelIcon className="dull-icon" />
                        ) : (
                          <FavoriteIcon className="highlight-icon" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="how-it-works-1__content__text-container">
            {/* <div className="how-it-works-1__content__description__paragraph">
              We know that finding the perfect team is key to a successful
              project, so we've made sure our onboarding process is
              comprehensive and tailored to your needs.
            </div> */}
            <div className="how-it-works-1__content__text-container__title">
              Swipe left or right?
            </div>
            <div className="how-it-works-1__conten__text-container__description">
              When you first sign up, we'll ask you to fill out a detailed
              profile that highlights your skills, experience, and preferences.
              This information will allow us to match you with teams that align
              with your interests and goals.
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBackground = () => {
    return (
      <div className="how-it-works-1__background">
        <div className="how-it-works-1__background__animation-wrapper"></div>
      </div>
    );
  };

  return (
    <div className="how-it-works-1">
      {renderBackground()}
      {renderContent()}
    </div>
  );
};

export default HowItWorks1;
