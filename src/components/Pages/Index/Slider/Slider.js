import React, { PureComponent } from "react";
import styles from "./slider.module.scss";

import { NavLink } from "react-router-dom";

class Slider extends PureComponent {
    // Инициализация слайдера после отрисовки компонента. Была ошибка "cant't call add", это из-за
    // двойной инициализации, поэтому тут проверка - not('.slick-initialized'), и только потом инициализация
    componentDidMount() {
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
    }

    render() {
        const { slides } = this.props;
        return (
            <div className={styles.slider}>
                <div className="slider-slick">
                    {slides.map((item, i) => (
                        <div key={i}>
                            <NavLink to="/category/phones">
                                <img className={styles.img} src={item.imgFullPath} alt={item.imgAlt} />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Slider;
