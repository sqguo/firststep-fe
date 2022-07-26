import React, { FunctionComponent } from "react";
import {Link} from "react-router-dom"
import { Button, Avatar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "./homepage.scss";
import theme from "../../common/styles/theme";
const bgimage = require("../../assets/firststep_bg.jpg");
interface Props {}

const Homepage: FunctionComponent<Props> = () => {
  return (
    <div className="homepage">
        <LandingFrame />
    </div>

  );
};

export default Homepage;


function LandingPageButton() {
    return (<Link to="/about" style={{ textDecoration: 'none' }}>
      <ThemeProvider theme={theme}>
        <Button variant="contained" size="large" className="homepage__button" >
            Find your FYDP team now
        </Button>
        </ThemeProvider>
    </Link>
    );
}
function LandingFrameMessage() {

    return <div className="homepage__landing-page">
        
        <div className="homepage__landing-page__title">
            FirstStep
        </div>

        <LandingPageButton />

        
        <div className="homepage__landing-page__info-box-top">
            Sign up and indicate your skills and preferences for the project
        </div>

        <div className="homepage__landing-page__info-box-mid">
            Wait for a match ... Next Round begins in <b>12 hours</b> and <b>45 minutes</b>
        </div>
        
        <div className="homepage__landing-page__info-box-bot">
            Talk to your new FYDP team! its that simple
        </div>
        <br />

    </div>
}
function LandingFrame() {
    return (<div className="homepage__bg-image">
        <LandingFrameMessage />
    </div>
    );
}
