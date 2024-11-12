import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type AnimatedNumberProps = {
  value: number;
};

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const valueObj = useRef({ value: displayValue });

  useEffect(() => {
    gsap.to(valueObj.current, {
      duration: 1,
      value: value,
      onUpdate: () => {
        setDisplayValue(Math.round(valueObj.current.value));
      },
    });
  }, [value]);

  return <div>{displayValue}</div>;
};
