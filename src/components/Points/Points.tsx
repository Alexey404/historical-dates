import gsap from "gsap";
import { FC, memo, useLayoutEffect, useRef } from "react";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { HistoticalDataType } from "../../constants/histoticalData";
import classNames from "classnames";
import styles from "./point.module.scss";

type PointsPropsType = {
  points: HistoticalDataType[];
  activeId: number;
  setActiveId: (index: number) => void;
  rotationPoints: number;
  countRotation: number;
};

export const Points: FC<PointsPropsType> = memo(props => {
  return props.points.map((point, index) => {
    const pointRef = useRef(null);
    const labelRef = useRef(null);
    const isActive = point.id === props.activeId;

    useLayoutEffect(() => {
      // Расставляем свойства элементам
      if (!pointRef.current) return;

      const angle = (2 * Math.PI * index) / props.points.length;
      // Тут можно было взять высоту и ширину из pointRef, но так как круг статичен не вижу в этом смысла
      const x = 264 + 264 * Math.cos(angle);
      const y = 264 + 264 * Math.sin(angle);

      gsap.set(pointRef.current, {
        x: "-50%",
        y: "-50%",
        left: x,
        top: y,
      });

      gsap.set(labelRef.current, {
        opacity: isActive ? 1 : 0,
      });
    }, []);

    useDidUpdate(() => {
      // поворачиваем элемент при изменении поворота круга
      if (!pointRef.current) return;

      gsap.to(pointRef.current, {
        duration: 0.5,
        rotation: props.rotationPoints,
        ease: "none",
      });

      gsap.to(labelRef.current, {
        duration: 0.2,
        opacity: 0,
        ease: "none",
      });
    }, [props.rotationPoints]);

    useDidUpdate(() => {
      // показываем label после того как остановится анимация круга
      if (!labelRef.current) return;
      if (props.countRotation) return;
      if (point.id !== props.activeId) return;

      const tween = gsap.to(labelRef.current, {
        duration: 0.3,
        opacity: 1,
        ease: "none",
      });

      return () => {
        tween.kill();
      };
    }, [props.countRotation]);

    return (
      <div
        key={point.id}
        ref={pointRef}
        className={styles["point"]}
        onClick={() => props.setActiveId(point.id)}
      >
        <div
          className={classNames(styles["point__content"], {
            [styles["point__content--active"]]: isActive,
          })}
        >
          <span className={styles["point__index"]}>{point.id}</span>
        </div>

        <span
          ref={labelRef}
          className={classNames(styles["point__label"], {
            [styles["point__label--active"]]: isActive,
          })}
        >
          {point.label}
        </span>
      </div>
    );
  });
});
