import { FC } from "react";
import { ArrowButton } from "../ArrowButton/ArrowButton";
import styles from "./page-navigator.module.scss";

interface PageIndicatorProps {
  totalPages: number;
  currentPage: number;
  onClickNext: () => void;
  onClickPrev: () => void;
}

export const PageNavigator: FC<PageIndicatorProps> = ({
  totalPages,
  currentPage,
  onClickPrev,
  onClickNext,
}) => {
  return (
    <div className={styles["page-navigator"]}>
      <span>
        {currentPage}/{totalPages}
      </span>
      <div className={styles["page-navigator__arrow-block"]}>
        <ArrowButton
          onClick={onClickPrev}
          className={styles["page-navigator__left-arrow"]}
          disabled={1 == currentPage}
        />
        <ArrowButton
          onClick={onClickNext}
          className={styles["page-navigator__right-arrow"]}
          disabled={totalPages == currentPage}
        />
      </div>
    </div>
  );
};
