import React from "react";
import { HistoticalDataType } from "../../constants/histoticalData";
import styles from "./page-indicator.module.scss";
import classNames from "classnames";

interface PageIndicatorProps {
  currentPage: number;
  contentItems: HistoticalDataType[];
  setActiveId: (id: number) => void;
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({
  contentItems,
  currentPage,
  setActiveId,
}) => {
  return (
    <div className={styles["page-indicator"]}>
      {Array.from({ length: contentItems.length }).map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveId(contentItems[index].id)}
          className={classNames(styles["page-indicator__item"], {
            [styles["page-indicator__item--active"]]: index === currentPage,
          })}
          style={{
            backgroundColor: index === currentPage ? "#333" : "#ccc",
          }}
        />
      ))}
    </div>
  );
};
