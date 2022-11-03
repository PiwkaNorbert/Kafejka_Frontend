import React, { useState } from "react";

import HackButton from "./HackButton";
import HackStatus from "./HackStatus";

const HackerPage = () => {
  const [isHacked, setIsHacked] = useState(false);
  console.log(isHacked);
  return (
    <div>
      <HackStatus isHackedStatus={isHacked} />
      <HackButton hackSetter={setIsHacked} hacked={isHacked} />
    </div>
  );
};

export default HackerPage;
