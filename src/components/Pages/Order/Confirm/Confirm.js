import React, { Component } from "react";
import cn from "classnames";
import styles from "./confirm.module.scss";
import img from "./img/thanks_sir.png";

class Confirm extends Component {
  render() {
    return (
      <div className={cn("animate__animated animate__bounceInRight", styles.checkout_modal)}>
        <span onClick={this.props.closeModal} className={styles.close} />
        <img src={img} alt="image-checkout" />
        <h3>Спасибо за заказ</h3>
        <p>Наш менеджер свяжется с вами в ближайшее время</p>
      </div>
    );
  }
}

export default Confirm;
