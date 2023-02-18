import React from "react";
import HomepageContext from "./context";
import Homepage from "./homepage";

const Wrapper = () => {
  return (
    <HomepageContext>
      <Homepage />
    </HomepageContext>
  );
};

export default Wrapper;
