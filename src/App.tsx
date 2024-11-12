import React from "react";
import { HistoricalDates } from "./components/HistoricalDates/HistoricalDates";
import { histoticalData } from "./constants/histoticalData";
import styles from "./app.module.scss";
import { SwiperWrapper } from "./components/SwiperWrapper/SwiperWrapper";

export const App: React.FC = () => {
  return (
    <div className={styles["app"]}>
      <div className={styles["app__container"]}>
        <HistoricalDates contentItems={histoticalData} />
        {/* <HistoricalDates contentItems={histoticalData} /> */}
      </div>
    </div>
  );
};
