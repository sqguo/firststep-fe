import React, { createContext, useEffect, useState } from "react";
import { noop } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getShowHomepageWalkthroughAction } from "../../store/actionCreators";

export enum Views {
  LandingPage,
  HowItWorks1_SignUp,
  HowItWorks2_Matching,
  HowItWorks3_PostMatch,
}

interface homepageContextProps {
  currentView: Views;
  setCurrentView: (val: Views) => void;
  goToNextView: () => void;
  goToPrevView: () => void;
}

export const homepageContext = createContext({
  currentView: Views.LandingPage,
  setCurrentView: noop,
  goToNextView: noop,
  goToPrevView: noop,
} as homepageContextProps);

const HomepageProvider = (props: any) => {
  const dispatch = useDispatch();
  const showWalkthrough = useSelector(
    (state: AppState) => state.showHomepageWalkthrough
  );
  const [currentView, setCurrentView] = useState(Views.LandingPage);
  const goToNextView = () => {
    setCurrentView((v) =>
      v < Views.HowItWorks3_PostMatch ? v + 1 : Views.LandingPage
    );
  };

  const goToPrevView = () => {
    setCurrentView((v) =>
      v > Views.LandingPage ? v - 1 : Views.LandingPage
    );
  };

  useEffect(() => {
    if (showWalkthrough && currentView === Views.LandingPage) {
      dispatch(getShowHomepageWalkthroughAction(false));
      goToNextView();
    } else {
      dispatch(getShowHomepageWalkthroughAction(false));
    }
  }, [showWalkthrough]);

  return (
    <homepageContext.Provider
      value={{
        currentView,
        setCurrentView,
        goToNextView,
        goToPrevView,
      }}
    >
      {props.children}
    </homepageContext.Provider>
  );
};

export default HomepageProvider;
