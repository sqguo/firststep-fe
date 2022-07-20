import React, { FunctionComponent } from "react";
import { CircularProgress } from "@mui/material";
import "./LoadingScreen.scss";

interface Props {
  isLoading: boolean;
}

const Preference: FunctionComponent<Props> = (props) => {
  const { isLoading } = props;

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
