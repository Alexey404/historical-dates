import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { ContentType } from "../../types/HistoticalDataTypes";
import styles from "./swiper-wrapper.module.scss";
import { useDevice } from "../../hooks/useDevice";

type SwiperWrapperProps = {
  items: ContentType[];
};

export const SwiperWrapper: FC<SwiperWrapperProps> = ({ items }) => {
  const [spaceBetween, setSpaceBetween] = useState(80);
  const swiperRef = useRef<SwiperClass | null>(null);
  const device = useDevice();

  useEffect(() => {
    setSpaceBetween(device === "mobile" || device === "tablet" ? 25 : 80);
  }, [device]);

  return (
    <Swiper
      onSwiper={swiper => (swiperRef.current = swiper)}
      slidesPerView="auto"
      className={styles["swiper"]}
      spaceBetween={spaceBetween}
      wrapperClass={styles["swiper__wrapper"]}
      loop={false}
    >
      {items.map((slideContent, index) => (
        <SwiperSlide
          key={slideContent.id}
          virtualIndex={index}
          className={styles["swiper__slide"]}
        >
          <div key={slideContent.id} className={styles["swiper__item"]}>
            <span className={styles["swiper__date"]}>{slideContent.date}</span>
            <span className={styles["swiper__content"]}>
              {slideContent.content}
            </span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
