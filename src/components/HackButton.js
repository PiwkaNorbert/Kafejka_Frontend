import React from "react";

const HackButton = (props) => {
  return (
    <button onClick={() => props.hackSetter(!props.hacked)}> Hack </button>
  );
};

export default HackButton;
