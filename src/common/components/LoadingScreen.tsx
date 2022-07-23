import React, { FunctionComponent, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import "./LoadingScreen.scss";

interface Props {
  isLoading: boolean;
}

const Preference: FunctionComponent<Props> = (props) => {
  const { isLoading } = props;

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return function cleanup() {
      document.body.style.overflow = "unset";
    };
  }, [isLoading])

  return (
    <React.Fragment>
      {isLoading && (
        <div className="loading-screen__container">
          <div className="spinner-wrapper">
            <CircularProgress />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Preference;
