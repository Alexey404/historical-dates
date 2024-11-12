import gsap from "gsap";
import { FC, useRef, useState } from "react";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { Carousel } from "../Carousel/Carousel";
import { flushSync } from "react-dom";

import styles from "./carousel-wrapper.module.scss";
import { HistoticalDataType } from "../../types/HistoticalDataTypes";
import { SwiperWrapper } from "../SwiperWrapper/SwiperWrapper";

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
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useDidUpdate(() => {
    const tween = gsap.to(contentRef.current, {
      duration: 0.5,
      opacity: 0,
      y: 20,
      onComplete: () => {
        setCurrentContent(contentItems[itemIndex].content);
        setCurrentLabel(contentItems[itemIndex].label);

        //Отключаем батчинг для того, что бы разрушить компонент
        flushSync(() => {
          setAnimatedSlider(true);
        });

        const tween = gsap.to(contentRef.current, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          onComplete: () => {},
        });

        tweenRef.current = tween;

        flushSync(() => {
          setAnimatedSlider(false);
        });
      },
    });

    return () => {
      tween.kill();
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
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
          <SwiperWrapper items={currentContent} />
        </>
      )}
    </div>
  );
};
