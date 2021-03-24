import React, { Component } from "react";

//import * as cartSelector from "@redux/entities/cart/selectors/cartSelectors";
import * as authActions from "@redux/entities/auth/actions";
import { connect } from "react-redux";

class Login extends Component {
  render() {
    const { logged } = this.props;
    return <button onClick={this.props.setToken}>Login</button>;
  }
}

function mapStateToProps(state) {
  return {
    index: state.db.index,
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
