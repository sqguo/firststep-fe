import React, { FunctionComponent } from "react";
import {Link} from "react-router-dom"

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
        <button className="btn btn-primary" > 
            <span style={{"fontSize": "24px"}}>
                Click Me!
            </span>
        </button>
    </Link>
    );
}
function LandingFrameMessage() {
    const style = {
        margin: "auto",
        padding: "10% 35% 10% 15%",
        color: "black"
    }
    return <div style={style}>
        
        <div style={{"fontSize": "96px"}}>
            Hello World!!
        </div>
        
        <div style={{"fontSize": "36px"}}>
            This is the landing page and here's some content.
            How much wood would a woodchuck chuck if a 
            woodchuck would chuck wood?
        </div>
        <br />
        <LandingPageButton />
    </div>
}
function LandingFrame() {
    return (<div style={{
      "backgroundImage": `url(${bgimage})`,
      "backgroundRepeat": "no-repeat",
      "backgroundSize": "cover",
      position: "absolute",
      height: "100%",
      width: "100%"
    }}>

        <LandingFrameMessage />
    </div>
    );
}
