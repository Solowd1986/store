import React, { Component } from "react";

import * as authActions from "@redux/entities/auth/actions";
import { connect } from "react-redux";

const Profile = (props = "some data in props") => (
    <div>
        <p>{props}</p>
        <button>Exit from account</button>
    </div>
);


class Login extends Component {
    render() {
        const { logged } = this.props;
        if (logged) return <Profile />;
        return (
            <form className="form" method="POST">
                <input className="form__input" type="text" name="login" placeholder="Enter login..." required />
                <input className="form__input" type="password" name="psw" placeholder="Enter psw..." required />
                <input type="checkbox" name="rememberUser" id="checkbox" />
                <input className="form__submit" type="submit" name="auth-submit" value="Send" />
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        logged: state.auth.logged,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setToken: () => {
            dispatch(authActions.authUser());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
