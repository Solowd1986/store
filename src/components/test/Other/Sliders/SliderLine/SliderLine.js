import React, { Component } from "react";
import styles from "./slider-line.module.scss";

export default class SliderLIne extends Component {
    constructor(props) {
        super(props);
        this.offset = 0;
    }

    next = () => {
        const list = document.querySelector("[data-list]");
        this.offset += 200;
        if (this.offset > 600) this.offset = 0;
        list.style.left = `-${this.offset}px`;
    };

    prev = () => {
        const list = document.querySelector("[data-list]");
        this.offset -= 200;
        if (this.offset < 0) this.offset = 600;
        list.style.left = `-${this.offset}px`;
    };

    render() {
        return (
            <>
                <div className={styles.slide_wrp}>
                    <div className={styles.slide} data-list={true}>
                        <img src="https://fakeimg.pl/200x200/282828/?text=IMG1" alt="generic_img" />
                        <img src="https://fakeimg.pl/200x200/282828/?text=IMG2" alt="generic_img" />
                        <img src="https://fakeimg.pl/200x200/282828/?text=IMG3" alt="generic_img" />
                        <img src="https://fakeimg.pl/200x200/282828/?text=IMG4" alt="generic_img" />
                    </div>
                </div>

                <div className={styles.btn_sl}>
                    <span onClick={this.prev}>prev</span>
                    <span onClick={this.next}>next</span>
                </div>
            </>
        );
    }
}
