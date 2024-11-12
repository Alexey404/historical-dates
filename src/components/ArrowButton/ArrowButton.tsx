import { ButtonHTMLAttributes, FC } from "react";

import classNames from "classnames";
import { Arrow } from "../Arrow/Arrow";
import styles from "./arrow-button.module.scss";

interface IArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  typeButton?: "flat-button" | "outlined-button";
}

export const ArrowButton: FC<IArrowButtonProps> = ({
  className,
  typeButton = "outlined-button",
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles["button"],
        {
          [styles["button__outlined-button"]]: typeButton === "outlined-button",
        },
        {
          [styles["button__flat-button"]]: typeButton === "flat-button",
        },
        {
          [styles["button--disabled"]]: props.disabled,
        },
        {
          [`${className}`]: className,
        }
      )}
      {...props}
    >
      <Arrow
        color={
          typeButton === "flat-button"
            ? "rgba(56, 119, 238, 1)"
            : "rgba(66, 86, 122, 1)"
        }
      />
    </button>
  );
};
