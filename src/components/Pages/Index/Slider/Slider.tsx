import React, { useEffect } from "react";
import styles from "./slider.module.scss";
import { ISlides, ISlide } from "@components/Pages/Index/Slider/types/Slider";
import { NavLink } from "react-router-dom";

const Slider = ({ slides }: ISlides) => {
    useEffect(() => {
        // Инициализация слайдера после отрисовки компонента. Была ошибка "cant't call add", это из-за
        // двойной инициализации, поэтому тут проверка - not('.slick-initialized'), и только потом инициализация
        $(document).ready(() => {
            $(".slider-slick").not(".slick-initialized").slick({
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,

                // autoplay: true,
                // autoplaySpeed: 2000,
            });
        });
    }, []);

    return (
        <div className={styles.slider}>
            <div className="slider-slick">
                {slides.map((item: ISlide, i: number) => (
                    <div key={i}>
                        <NavLink to="/category/phones">
                            <img className={styles.img} src={item.imgFullPath} alt={item.imgAlt}/>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(Slider);
