import React, { FunctionComponent } from "react";
import {Link} from "react-router-dom"
import { Button, Avatar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "./homepage.scss";

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
    return (<Link to="/about" className="nav-link">
        <button className="homepage__button" > 
            <span style={{"fontSize": "24px"}}>
                Click Me!
            </span>
        </button>
    </Link>
    );
}
function LandingFrameMessage() {

    return <div className="homepage__landing-page">
        
        <div className="homepage__landing-page__title">
            Hello World!!
        </div>
        
        <div className="homepage__landing-page__info-box">
            This is the landing page and here's some content.
            How much wood would a woodchuck chuck if a 
            woodchuck would chuck wood?
        </div>
        <br />
        <LandingPageButton />
    </div>
}
function LandingFrame() {
    return (<div className="homepage__bg-image">
        <LandingFrameMessage />
    </div>
    );
}
