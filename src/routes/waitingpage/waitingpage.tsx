import React, { FunctionComponent } from "react";
import { Button, Avatar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "./waitingpage.scss";
import theme from "../../common/styles/theme";
const bgimage = require("../../assets/firststep_bg.jpg");
interface Props {}

const WaitingPage: FunctionComponent<Props> = () => {
  return (
    <div className="waitingpage">
        <WaitingFrame />
    </div>

  );
};

export default WaitingPage;

function Waiting() {

    return <div className="waitingpage__landing-page__box">

    <div className="waitingpage__landing-page__box__header" >
        You don't have a team yet
    </div>

    <div className="waitingpage__landing-page__box__info" >
            Next Round Begins in <b>12 hours</b> and <b>32 minutes</b>
            <br></br>
    </div>

    </div>
}
function WaitingFrame() {
    return (<div className="waitingpage__bg-image">
        <Waiting />
    </div>
    );
}
