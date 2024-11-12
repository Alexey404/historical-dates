import { gsap } from "gsap";
import React, { useMemo, useRef, useState } from "react";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { getShortestRotation } from "../../utils/getShortestRotation";
import { sortByActiveIndex } from "../../utils/sortByActiveIndex";
import { Points } from "../Points/Points";
import styles from "./circle.module.scss";
import { HistoticalDataType } from "../../types/HistoticalDataTypes";

type CircleProps = {
  points: HistoticalDataType[];
  activeId: number;
  setActiveId: (index: number) => void;
};

export const Circle: React.FC<CircleProps> = props => {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [rotationPoints, setRotationPoints] = useState(0);
  const [countRotation, setCountRotation] = useState(0);
  const activeIndex = useMemo(() => {
    return props.points.findIndex(e => e.id === props.activeId);
  }, [props.activeId]);

  const pointsSort: HistoticalDataType[] = useMemo(() => {
    return sortByActiveIndex(props.points, activeIndex);
  }, [props.points]);

  const angleStep = useMemo(() => 360 / props.points.length, []);
  const circleRef = useRef<HTMLDivElement>(null);
  const lastActiveIndex = useRef(activeIndex);

  const onStart = () => {
    setCountRotation(prev => prev + 1);
  };

  const onComplete = () => {
    setCountRotation(prev => prev - 1);
  };

  useDidUpdate(() => {
    // Сохраняем угол поворота круга
    setCurrentRotation(
      currentRotation -
        getShortestRotation(
          lastActiveIndex.current,
          activeIndex,
          pointsSort.length
        )
    );
    const rotation = -(
      currentRotation -
      getShortestRotation(
        lastActiveIndex.current,
        activeIndex,
        pointsSort.length
      ) -
      60
    );
    setRotationPoints(rotation);

    lastActiveIndex.current = activeIndex;
  }, [activeIndex, angleStep]);

  useDidUpdate(() => {
    //При изменении стейта с углом поворота анимацию
    gsap.to(circleRef.current, {
      duration: 1,
      rotate: currentRotation,
      ease: "power2.out",
      onStart,
      onComplete,
    });
  }, [currentRotation]);

  return (
    <div className={styles["circle-container"]}>
      <div className={styles["circle-container__circle"]} ref={circleRef}>
        <Points
          countRotation={countRotation}
          rotationPoints={rotationPoints}
          points={pointsSort}
          setActiveId={props.setActiveId}
          activeId={props.activeId}
        />
      </div>
    </div>
  );
};
