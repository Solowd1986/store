import React, { useEffect, useRef } from "react";
import styles from "./product-slider.module.scss";
import { ISingleProductSlider } from "@root/ts/types/single-product";

const ProductSlider = ({ list, alt }: ISingleProductSlider): JSX.Element => {
    const slideTransitionEnabled = useRef(false);
    const mainImgRef = useRef<HTMLImageElement>(null);
    const slideThumbnailList = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mainImgRef.current || !slideThumbnailList.current) return;
        const slideList = Array.from(slideThumbnailList.current.children);
        const findSlide = slideList.find((item) => (item as HTMLImageElement).src === mainImgRef.current?.src);
        if (findSlide) findSlide.classList.add(styles.active);
    }, []);


    const slideClickHandler = (evt: React.SyntheticEvent<HTMLImageElement>): void => {
        const target = evt.target as HTMLImageElement;
        if (!mainImgRef.current || !slideThumbnailList.current) return;
        const mainImg = mainImgRef.current;
        const slideLeftClassList = ["animate__fadeOutLeft", "animate__animated", "animate__faster"];
        const slideFadeInClassList = ["animate__fadeIn", "animate__animated", "animate__faster"];

        if (mainImg.src === target.src || slideTransitionEnabled.current) return;
        slideTransitionEnabled.current = true;

        Array.from(slideThumbnailList.current.children).forEach((item) => item.classList.remove(styles.active));
        target.classList.add(styles.active);

        mainImg.addEventListener(
            "animationend",
            () => {
                mainImg.src = target.src;
                mainImg.classList.remove(...slideLeftClassList);
                mainImg.classList.add(...slideFadeInClassList);
                slideTransitionEnabled.current = false;
            },
            { once: true },
        );
        mainImg.classList.add(...slideLeftClassList);
    };


    return (
        <div className={styles.order__img_wrapper}>
            <img
                width={480}
                height={480}
                ref={mainImgRef}
                className={styles.order__img}
                src={`${list[0]}`}
                alt={alt}
            />

            <div className={styles.slider} ref={slideThumbnailList}>
                {list.map((path: string) => (
                    <img
                        key={path}
                        width="60"
                        height="60"
                        onClick={slideClickHandler}
                        className={styles.img}
                        src={path}
                        alt={alt}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(ProductSlider);
