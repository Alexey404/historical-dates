import { FC, useMemo, useState } from "react";
import { useDevice } from "../../hooks/useDevice";
import { AnimatedNumber } from "../AnimatedNumber/AnimatedNumber";
import { Circle } from "../Circle/Circle";
import { PageIndicator } from "../PageIndicator/PageIndicator";
import { PageNavigator } from "../PageNavigator/PageNavigator";
import { CarouselWrapper } from "../AnimatedCarouselWrapper/CarouselWrapper";
import { HistoticalDataType } from "../../types/HistoticalDataTypes";
import styles from "./historical-dates.module.scss";

interface HistoricalDatesProps {
  contentItems: HistoticalDataType[];
}

export const HistoricalDates: FC<HistoricalDatesProps> = ({ contentItems }) => {
  const [activeId, setActiveId] = useState(contentItems[0].id);
  const device = useDevice();

  const itemIndex = useMemo(() => {
    return contentItems.findIndex(item => item.id === activeId);
  }, [activeId]);

  const onClickNext = () => {
    const calculateIndex = itemIndex + 1;

    setActiveId(contentItems[calculateIndex].id);
  };

  const onClickPrev = () => {
    const calculateIndex = itemIndex - 1;

    setActiveId(contentItems[calculateIndex].id);
  };

  return (
    <div className={styles["content"]}>
      <div className={styles["content__title-wrapper"]}>
        <div className={styles["content__title"]}>Исторические даты</div>
      </div>
      <div className={styles["content__interactive-content"]}>
        <div>
          <div className={styles["content__date"]}>
            <span className={styles["content__from"]}>
              <AnimatedNumber value={contentItems[itemIndex].from} />
            </span>
            <span className={styles["content__to"]}>
              <AnimatedNumber value={contentItems[itemIndex].to} />
            </span>
            {(device === "desktop" || device === "laptop") && (
              // Удаляем элементы из вёрстки что бы не выполнялась лишняя логика
              <div className={styles["content__circle-wrapper"]}>
                <Circle
                  points={contentItems}
                  activeId={activeId}
                  setActiveId={setActiveId}
                />
              </div>
            )}
          </div>
          <div className={styles["content__navigator-desktop"]}>
            <PageNavigator
              currentPage={itemIndex + 1}
              totalPages={contentItems.length}
              onClickNext={onClickNext}
              onClickPrev={onClickPrev}
            />
          </div>
        </div>
        <div className={styles["content__bottom"]}>
          <CarouselWrapper contentItems={contentItems} itemIndex={itemIndex} />
          <div className={styles["content__navigator-container"]}>
            <div className={styles["content__navigator-mobile"]}>
              <PageNavigator
                currentPage={itemIndex + 1}
                totalPages={contentItems.length}
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </div>
            <PageIndicator
              currentPage={itemIndex}
              contentItems={contentItems}
              setActiveId={setActiveId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
