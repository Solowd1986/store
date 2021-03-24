import React, { Component } from "react";
import styles from "./tabs.module.scss";
import classNames from "classnames";

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.refList = React.createRef();
    this.params = {};
    this.transitionEnd = true;
  }

  componentDidMount() {
    this.list = Array.from(this.refList.current.children);
    this.list.forEach((item) => {
      item.children[1].style.cssText = "height: auto; overflow: initial, position: absolute; visibility: hidden";
      this.params[item.children[0].innerText] = item.children[1].clientHeight;
      item.children[1].style.cssText = "";
    });
    this.list[0].children[1].style.height = `${this.params[this.list[0].children[0].innerText]}px`;
  }

  open = (evt) => {
    if (evt.target.nextSibling.dataset.active) return;

    if (!this.transitionEnd) return;
    this.transitionEnd = false;

    this.list.forEach((item) => (item.children[1].style.transition = "height .3s ease-in"));

    const activeContent = this.list.find((item) => item.children[1].dataset.active).children[1];
    activeContent.removeAttribute("data-active");
    activeContent.style.removeProperty("height");

    const targetButton = evt.target;
    const targetContent = evt.target.nextSibling;
    const height = this.params[Object.keys(this.params).find((item) => item === targetButton.innerText)];

    targetContent.addEventListener(
      "transitionend",
      () => {
        this.transitionEnd = true;
      },
      { once: true }
    );

    targetContent.setAttribute("data-active", "true");
    targetContent.style.height = `${height}px`;
  };

  render() {
    return (
      <ul className={styles.list} ref={this.refList}>
        <li className={styles.item}>
          <span className={classNames(styles.title)} onClick={this.open}>
            Item 1
          </span>
          <p className={classNames(styles.content)} data-active={true}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
          </p>
        </li>
        <li className={styles.item}>
          <span className={styles.title} onClick={this.open}>
            Item 2
          </span>
          <p className={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
          </p>
        </li>
        <li className={styles.item}>
          <span className={styles.title} onClick={this.open}>
            Item 3
          </span>
          <p className={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
          </p>
        </li>
        <li className={styles.item}>
          <span className={styles.title} onClick={this.open}>
            Item 4
          </span>
          <p className={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid cumque ducimus, eius ex fugiat
            ipsa ipsam libero maxime minus nihil nostrum officia pariatur placeat quasi qui quia repellat voluptas.
          </p>
        </li>
      </ul>
    );
  }
}

export default Tabs;
