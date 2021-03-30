import React, { Component } from "react";
// import styles from "./auth.module.scss";

class Auth extends Component {
    render() {
        return (
            <>
                <div className={styles.form}>
                <ul className="tab-group">
                        <li className="tab active">
                            <a href="#signup">Sign Up</a>
                  </li>
                        <li className="tab">
                    <a href="#login">Log In</a>
                  </li>
                  </ul>

                <div className="tab-content">
                      <div id="signup">
                          <h1>Sign Up for Free</h1>

                          <form action="/" method="post">
                                <div className="top-row">
                                    <div className="field-wrap">
                                        <label>
                                        First Name
                                            <span className="req">*</span>
                                      </label>
                                    <input type="text" required autoComplete="off" />
                                  </div>

                                <div className="field-wrap">
                                        <label>
                                        Last Name
                                            <span className="req">*</span>
                                        </label>
                                        <input type="text" required autoComplete="off" />
                                  </div>
                              </div>

                                <div className="field-wrap">
                                <label>
                                      Email Address
                                        <span className="req">*</span>
                                    </label>
                                <input type="email" required autoComplete="off" />
                              </div>

                                <div className="field-wrap">
                                <label>
                                      Set A Password
                                        <span className="req">*</span>
                                    </label>
                                <input type="password" required autoComplete="off" />
                              </div>

                          <button type="submit" className="button button-block">
                                Get Started
                                </button>
                        </form>
                        </div>
                    </div>

                    <div id="login">
                    <h1>Welcome Back!</h1>

                    <form action="/" method="post">
                    <div className="field-wrap">
                                <label>
                        Email Address
                                    <span className="req">*</span>
                      </label>
                                <input type="email" required autoComplete="off" />
                        </div>

                    <div className="field-wrap">
                          <label>
                        Password
                                    <span className="req">*</span>
                      </label>
                          <input type="password" required autoComplete="off" />
                            </div>

                            <p className="forgot">
                                <a href="#">Forgot Password?</a>
                        </p>

                            <button className="button button-block">Log In</button>
                        </form>
                    </div>
              </div>
          </>
        );
    }
}

export default Auth;
