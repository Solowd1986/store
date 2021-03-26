import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import $ from "jquery";
import styles from "./slider.module.scss";
import "slick-carousel/slick/slick.min";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Slider extends Component {
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
    const slider = [
      {
        src: {
          lg: "/static/media/slider/slider-1-lg-1920_600.jpg",
          sm: "/static/media/slider/slider-1-sm-530_400.jpg",
        },
        alt: "slider-image",
      },
      {
        src: {
          lg: "/static/media/slider/slider-2-lg-1920_600.jpg",
          sm: "/static/media/slider/slider-2-sm-530_400.jpg",
        },
        alt: "slider-image",
      },
      {
        src: {
          lg: "/static/media/slider/slider-3-lg-1920_600.jpg",
          sm: "/static/media/slider/slider-3-sm-530_400.jpg",
        },
        alt: "slider-image",
      },
      {
        src: {
          lg: "/static/media/slider/slider-4-lg-1920_600.jpg",
          sm: "/static/media/slider/slider-4-sm-530_400.jpg",
        },
        alt: "slider-image",
      },
      {
        src: {
          lg: "/static/media/slider/slider-5-lg-1920_600.jpg",
          sm: "/static/media/slider/slider-5-sm-530_400.jpg",
        },
        alt: "slider-image",
      },
    ];

    return (
      <div className={styles.slider}>
        <div className="slider-slick">
          {slider.map((item, i) => (
            <div key={i}>
              <NavLink className="" to="/category/phones">
                <img className={styles.img} src={item.src.lg} alt={item.alt} />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Slider;
