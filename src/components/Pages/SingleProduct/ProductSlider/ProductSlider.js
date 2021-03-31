import React, { Component } from "react";
import styles from "./product-slider.module.scss";

class ProductSlider extends Component {
    constructor(props) {
        super(props);
        this.slideTransitionEnabled = false;
        this.mainImgRef = React.createRef();
        this.listSmallImgRef = React.createRef();
        this.slideLeftClassList = ["animate__fadeOutLeft", "animate__animated", "animate__faster"];
        this.fadeInClassList = ["animate__fadeIn", "animate__animated", "animate__faster"];
    }

    componentDidMount() {
        Array.from(this.listSmallImgRef.current.children)
            .find((item) => item.src === this.mainImgRef.current.src)
            .classList.add(styles.active);
    }

    toggleSlide = (evt) => {
        const target = evt.target;
        const mainImg = this.mainImgRef.current;
        if (mainImg.src === target.src || this.slideTransitionEnabled) return;
        this.slideTransitionEnabled = true;

        Array.from(this.listSmallImgRef.current.children).forEach((item) => item.classList.remove(styles.active));
        target.classList.add(styles.active);

        mainImg.classList.add(...this.slideLeftClassList);
        mainImg.addEventListener(
            "animationend",
            () => {
                mainImg.src = target.src;
                mainImg.classList.remove(...this.slideLeftClassList);
                mainImg.classList.add(...this.fadeInClassList);
                this.slideTransitionEnabled = false;
            },
            { once: true }
        );
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

                <div className={styles.slider} ref={this.listSmallImgRef}>
                    {list.map((path) => (
                        <img
                            key={path}
                            width="60"
                            height="60"
                            onClick={this.toggleSlide}
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
