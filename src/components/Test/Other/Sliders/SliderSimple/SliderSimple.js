import React, { Component } from "react";
import styles from "./simple-slider.module.scss";
import classNames from "classnames";

export default class SliderSimple extends Component {
    nextsl = () => {
        const list = Array.from(document.querySelector("[data-list]").children);
        const item = list.find((item) => item.classList.contains(styles.active_slide));
        list.find((item) => item.classList.contains(styles.active_slide)).classList.remove(styles.active_slide);
        const i = list.indexOf(item);
        list[i + 1 > list.length - 1 ? 0 : i + 1].classList.add(styles.active_slide);
    };

    render() {
        return (
            <>
                <div data-list={true}>
                    <img
                        className={classNames(styles.slide, styles.active_slide)}
                        src="https://fakeimg.pl/200x200/282828/?text=IMG1"
                        alt="generic_img"
                    />
                    <img
                        className={classNames(styles.slide)}
                        src="https://fakeimg.pl/200x200/282828/?text=IMG2"
                        alt="generic_img"
                    />
                    <img
                        className={classNames(styles.slide)}
                        src="https://fakeimg.pl/200x200/282828/?text=IMG3"
                        alt="generic_img"
                    />
                    <img
                        className={classNames(styles.slide)}
                        src="https://fakeimg.pl/200x200/282828/?text=IMG4"
                        alt="generic_img"
                    />
                </div>

                <button onClick={this.nextsl}>next</button>
            </>
        );
    }
}
