import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";

import { FC, useEffect, useRef, useState } from "react";
import { ContentType } from "../../types/HistoticalDataTypes";
import "./swiper-wrapper.scss";

type SwiperWrapperProps = {
  items: ContentType[];
};

export const SwiperWrapper: FC<SwiperWrapperProps> = ({ items }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(1); // Стартовое значение - 1 слайд


  const calculateSlidesPerView = () => {
    const windowWidth = window.innerWidth;
    // Пример для слайдов шириной 320px
    const slides = Math.floor(windowWidth / 320); // Вычисляем количество слайдов, которое помещается на экране
    setSlidesPerView(slides > 0 ? slides : 1); // Если на экране не помещается ни один слайд, показываем хотя бы 1
  };

  useEffect(() => {
    calculateSlidesPerView(); // Вначале рассчитываем количество слайдов
    window.addEventListener("resize", calculateSlidesPerView); // Обновляем на изменение размера экрана

    return () => {
      window.removeEventListener("resize", calculateSlidesPerView); // Убираем слушатель при размонтировании компонента
    };
  }, []);

  const onReachEnd = () => {
    if (swiperRef.current) {
      swiperRef.current.allowSlideNext = false; // Отключить прокрутку вперед
    }
  };

  const onReachBeginning = () => {
    if (swiperRef.current) {
      swiperRef.current.allowSlidePrev = false; // Отключить прокрутку назад
    }
  };

  const onSlideChange = () => {
    if (swiperRef.current) {
      // Включаем прокрутку снова, если не на границе
      swiperRef.current.allowSlideNext = !swiperRef.current.isEnd;
      swiperRef.current.allowSlidePrev = !swiperRef.current.isBeginning;
    }
  };
  return (
    <Swiper
      onSwiper={swiper => (swiperRef.current = swiper)}
      spaceBetween={10}
      slidesPerView={slidesPerView}
      onReachEnd={onReachEnd}
      onReachBeginning={onReachBeginning}
      onSlideChange={onSlideChange}
      loop={false}
      watchOverflow={true}
    >
      {items.map((slideContent, index) => (
        <SwiperSlide key={slideContent.id} virtualIndex={index}>
          {slideContent.content}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
