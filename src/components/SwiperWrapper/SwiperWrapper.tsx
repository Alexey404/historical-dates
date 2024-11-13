import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { ContentType } from "../../types/HistoticalDataTypes";
import styles from "./swiper-wrapper.module.scss";
import { useDevice } from "../../hooks/useDevice";
import { ArrowButton } from "../ArrowButton/ArrowButton";

type SwiperWrapperProps = {
  items: ContentType[];
};

export const SwiperWrapper: FC<SwiperWrapperProps> = ({ items }) => {
  const [spaceBetween, setSpaceBetween] = useState(80);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const device = useDevice();

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  useEffect(() => {
    setSpaceBetween(device === "mobile" || device === "tablet" ? 25 : 80);
  }, [device]);

  return (
    <div className={styles["swiper__container"]}>
      {!isBeginning && (
        <ArrowButton
          onClick={handlePrev}
          className={styles["swiper__prev-item"]}
          typeButton="flat-button"
        />
      )}
      <Swiper
        onSwiper={swiper => (swiperRef.current = swiper)}
        slidesPerView="auto"
        className={styles["swiper"]}
        spaceBetween={spaceBetween}
        wrapperClass={styles["swiper__wrapper"]}
        loop={false}
        onReachBeginning={() => setIsBeginning(true)}
        onReachEnd={() => setIsEnd(true)}
        onFromEdge={() => {
          setIsBeginning(swiperRef.current?.isBeginning || false);
          setIsEnd(swiperRef.current?.isEnd || false);
        }}
      >
        {items.map((slideContent, index) => (
          <SwiperSlide
            key={slideContent.id}
            virtualIndex={index}
            className={styles["swiper__slide"]}
          >
            <div key={slideContent.id} className={styles["swiper__item"]}>
              <span className={styles["swiper__date"]}>
                {slideContent.date}
              </span>
              <span className={styles["swiper__content"]}>
                {slideContent.content}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {!isEnd && (
        <ArrowButton
          onClick={handleNext}
          className={styles["swiper__next-item"]}
          typeButton="flat-button"
        />
      )}
    </div>
  );
};
