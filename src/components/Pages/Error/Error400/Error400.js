import React, { Component } from "react";
import styles from "./error-400.module.scss";
import cn from "classnames"
import { withRouter } from "react-router";
import img from "./img/error-400.png";

class Error400 extends Component {
  static defaultProps = {
    resetErrorState: () => {}
  };

  redirect = () => {
    this.props.resetErrorState();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className={cn("overlay", "overlay__w-bg")}>
        <div className={styles.content}>
          <img src={img} alt="image" />
          <h3 className={styles.title}>Что-то пошло не так!</h3>
          <p onClick={this.redirect} className={styles.btn}>
            НА ГЛАВНУЮ
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Error400);
