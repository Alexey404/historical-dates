import { FC } from "react";

type ArrpwProps = {
  color?: string;
};

export const Arrow: FC<ArrpwProps> = ({ color = "#42567A" }) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
};
