import gsap from "gsap";
import { FC, useEffect, useRef, useState } from "react";
import { ContentType } from "../../constants/histoticalData";
import { ArrowButton } from "../ArrowButton/ArrowButton";
import styles from "./carousel.module.scss";

type CarouselProps = {
  items: ContentType[];
};

export const Carousel: FC<CarouselProps> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [minOffset, setMinOffset] = useState(0);
  const [moveHistory, setMoveHistory] = useState<
    { time: number; deltaX: number }[]
  >([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const getRelativeX = (): number => {
    if (!containerRef.current || !carouselRef.current) return 0;
    const parentRect = containerRef.current?.getBoundingClientRect();
    const elementRect = carouselRef.current?.getBoundingClientRect();
    const relativeX = elementRect.left - parentRect.left;
    return relativeX;
  };

  const getMinOffset = () => {
    if (!carouselRef.current || !containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const carouselWidth = carouselRef.current.scrollWidth;
    const newMinOffset = -(carouselWidth - containerWidth);
    return newMinOffset - 5;
  };

  const getGap = (ref: HTMLDivElement) => {
    const computedStyles = window.getComputedStyle(ref);
    return computedStyles.gap === "normal" ? 0 : parseFloat(computedStyles.gap);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    if (!carouselRef.current) return;
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });

    setDragOffset(translateX);
    setMoveHistory([]);

    if (!("touches" in e)) {
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStart.x;

    gsap.set(carouselRef.current, {
      x: dragOffset + deltaX,
    });

    const currentTime = Date.now();

    setTranslateX(dragOffset + deltaX);
    setMoveHistory(prev => {
      const newHistory = [...prev, { time: currentTime, deltaX }];
      return newHistory.filter(item => currentTime - item.time <= 300);
    });
  };

  const handleMouseUp = () => {
    if (!carouselRef.current || !containerRef.current) return;

    const timeSpan = 300;
    const recentMoves = moveHistory.filter(
      item => Date.now() - item.time <= timeSpan
    );

    let velocity = 0;
    const maxVelocity = { minValue: -2000, maxValue: 2000 };

    if (recentMoves.length > 1) {
      const deltaX =
        recentMoves[recentMoves.length - 1].deltaX - recentMoves[0].deltaX;
      const deltaTime =
        recentMoves[recentMoves.length - 1].time - recentMoves[0].time;
      velocity = (deltaX / deltaTime) * 1000;
    }

    if (velocity > maxVelocity.maxValue) velocity = maxVelocity.maxValue;
    if (velocity < maxVelocity.minValue) velocity = maxVelocity.minValue;

    const maxOffset = 0;

    const x = translateX + velocity / 4;

    const maxOffsetReturned = x > maxOffset ? maxOffset : null;
    const minOffsetReturned = x < minOffset ? minOffset : null;

    const tween = gsap.to(carouselRef.current, {
      x: maxOffsetReturned ?? minOffsetReturned ?? x,
      duration: 0.5,
      ease: "power3.out",
      onUpdate: () => {
        setTranslateX(getRelativeX());
      },
    });

    tweenRef.current = tween;

    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) handleMouseUp();
  };

  const scrollToNextItem = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current.parentElement;

    if (!container) return;

    const gapCarousel = getGap(carouselRef.current);
    const containerRight = container.getBoundingClientRect().right;
    const items = Array.from(carouselRef.current.children) as HTMLElement[];

    let targetOffset = translateX;

    for (const item of items) {
      const itemRect = item.getBoundingClientRect();
      const itemLeft = itemRect.left;
      const itemRight = itemLeft + item.offsetWidth;

      if (itemRight > containerRight) {
        targetOffset =
          translateX + containerRight - itemRight - gapCarousel / 2;
        break;
      }
    }

    gsap.to(carouselRef.current, {
      x: targetOffset,
      duration: 0.2,
      ease: "power3.out",
      onUpdate: () => {
        setTranslateX(getRelativeX());
      },
    });
  };

  const scrollToPrev = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current.parentElement;

    if (!container) return;

    const gapCarousel = getGap(carouselRef.current);
    const containerLeft = container.getBoundingClientRect().left;
    const items = Array.from(carouselRef.current.children) as HTMLElement[];

    let targetOffset = translateX;

    for (const item of items.reverse()) {
      const itemRect = item.getBoundingClientRect();
      const itemLeft = itemRect.left;

      if (itemLeft < containerLeft) {
        targetOffset =
          translateX + (containerLeft - itemLeft) + gapCarousel / 2;
        break;
      }
    }

    gsap.to(carouselRef.current, {
      x: targetOffset,
      duration: 0.2,
      ease: "power3.out",
      onUpdate: () => {
        setTranslateX(getRelativeX());
      },
    });
  };

  const resize = () => {
    const maxOffset = 0;
    const newMinOffset = getMinOffset();
    const relativeX = getRelativeX();
    setMinOffset(newMinOffset);

    if (relativeX < maxOffset && relativeX > newMinOffset) return;

    let x = relativeX;

    if (relativeX < newMinOffset) {
      x = newMinOffset;
    }

    if (relativeX > maxOffset) {
      x = maxOffset;
    }

    gsap.to(carouselRef.current, {
      x,
      duration: 0.2,
      ease: "power3.out",
      onUpdate: () => {
        setTranslateX(getRelativeX());
      },
    });
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    setMinOffset(getMinOffset());

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [items]);

  return (
    <div className={styles["carousel"]}>
      <div className={styles["carousel__wrapper"]} ref={containerRef}>
        <div className={styles["carousel__separator"]} />
        <div
          ref={carouselRef}
          className={styles["carousel__items"]}
          onMouseDown={handleMouseDown}
          onMouseMove={isDragging ? handleMouseMove : undefined}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseDown}
          onTouchMove={isDragging ? handleMouseMove : undefined}
          onTouchEnd={handleMouseUp}
          onTouchCancel={handleMouseLeave}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {items.map(item => (
            <div
              key={item.id}
              className={styles["carousel__item"]}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
              }}
            >
              <span className={styles["carousel__date"]}>{item.date}</span>
              <span className={styles["carousel__content"]}>
                {item.content}
              </span>
            </div>
          ))}
        </div>
      </div>

      <>
        {translateX < 0 && (
          <ArrowButton
            onClick={scrollToPrev}
            className={styles["carousel__prev-item"]}
            typeButton="flat-button"
          />
        )}
        {translateX > minOffset && (
          <ArrowButton
            onClick={scrollToNextItem}
            className={styles["carousel__next-item"]}
            typeButton="flat-button"
          />
        )}
      </>
    </div>
  );
};
