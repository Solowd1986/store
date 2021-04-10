import React, { Component } from "react";
import styles from "./product-slider.module.scss";

class ProductSlider extends Component {
    constructor(props) {
        super(props);
        this.slideTransitionEnabled = false;
        this.mainImgRef = React.createRef();
        this.slideThumbnailList = React.createRef();
    }

    componentDidMount() {
        Array.from(this.slideThumbnailList.current.children)
            .find((item) => item.src === this.mainImgRef.current.src)
            .classList.add(styles.active);
    }

    slideClickHandler = ({ target }) => {
        const mainImg = this.mainImgRef.current;
        const slideLeftClassList = ["animate__fadeOutLeft", "animate__animated", "animate__faster"];
        const slideFadeInClassList = ["animate__fadeIn", "animate__animated", "animate__faster"];

        if (mainImg.src === target.src || this.slideTransitionEnabled) return;
        this.slideTransitionEnabled = true;

        Array.from(this.slideThumbnailList.current.children).forEach((item) => item.classList.remove(styles.active));
        target.classList.add(styles.active);

        mainImg.addEventListener(
            "animationend",
            () => {
                mainImg.src = target.src;
                mainImg.classList.remove(...slideLeftClassList);
                mainImg.classList.add(...slideFadeInClassList);
                this.slideTransitionEnabled = false;
            },
            { once: true },
        );
        mainImg.classList.add(...slideLeftClassList);
    };

    render() {
        const { list, alt } = this.props;
        return (
            <div className={styles.order__img_wrapper}>
                <img
                    width={480}
                    height={480}
                    ref={this.mainImgRef}
                    className={styles.order__img}
                    src={`${list[0]}`}
                    alt={alt}
                />

                <div className={styles.slider} ref={this.slideThumbnailList}>
                    {list.map((path) => (
                        <img
                            key={path}
                            width="60"
                            height="60"
                            onClick={this.slideClickHandler}
                            className={styles.img}
                            src={path}
                            alt={alt}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default ProductSlider;
