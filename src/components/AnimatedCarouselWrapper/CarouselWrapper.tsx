import gsap from "gsap";
import { FC, useRef, useState } from "react";
import { HistoticalDataType } from "../../constants/histoticalData";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { Carousel } from "../Carousel/Carousel";
import { flushSync } from "react-dom";

import styles from "./carousel-wrapper.module.scss";

type CarouselWrapperProps = {
  contentItems: HistoticalDataType[];
  itemIndex: number;
};

export const CarouselWrapper: FC<CarouselWrapperProps> = ({
  contentItems,
  itemIndex,
}) => {
  const contentRef = useRef(null);
  const [animatedSlider, setAnimatedSlider] = useState(false);
  const [currentContent, setCurrentContent] = useState(
    contentItems[itemIndex].content
  );
  const [currentLabel, setCurrentLabel] = useState(
    contentItems[itemIndex].label
  );

  useDidUpdate(() => {
    const tween = gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentContent(contentItems[itemIndex].content);
        setCurrentLabel(contentItems[itemIndex].label);

        //Отключаем батчинг для того, что бы разрушить компонент
        flushSync(() => {
          setAnimatedSlider(true);
        });

        gsap.to(contentRef.current, {
          opacity: 1,
          duration: 0.5,
          onComplete: () => {},
        });

        flushSync(() => {
          setAnimatedSlider(false);
        });
      },
    });

    return () => {
      tween.kill();
    };
  }, [itemIndex]);

  return (
    <div ref={contentRef} className={styles["carousel-wrapper"]}>
      {!animatedSlider && (
        <>
          <span className={styles["carousel-wrapper__mobile-label"]}>
            {currentLabel}
          </span>
          <Carousel items={currentContent} />
        </>
      )}
    </div>
  );
};
