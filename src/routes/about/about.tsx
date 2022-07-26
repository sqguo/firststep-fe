import React, { FunctionComponent } from "react";
import { Button, Avatar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "./about.scss";
import theme from "../../common/styles/theme";
const bgimage = require("../../assets/firststep_bg.jpg");
interface Props {}

const About: FunctionComponent<Props> = () => {
  return (
    <div className="homepage">
        <AboutFrame />
    </div>

  );
};

export default About;

function AboutMessage() {

    return <div className="aboutpage__landing-page__box">

    <div className="aboutpage__landing-page__box__header" >
        About us section
    </div>

    <div className="aboutpage__landing-page__box__info" >
            Project created by: 
             FYDP Group 58
            <br></br>
            For more inquiries, please contact help@FirstStep.ca
    </div>

    </div>
}
function AboutFrame() {
    return (<div className="aboutpage__bg-image">

        <AboutMessage />
    </div>
    );
}
