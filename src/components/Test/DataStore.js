import React, { Component } from "react";

import * as serverSelectors from "@redux/entities/server/selectors/serverSelectors";
import { bindActionCreators } from "redux";
import * as authActions from "@redux/entities/auth/actions";
import { connect } from "react-redux";

export const Alert = ({ children }) => {
  const color = "red";
  return <div>{children(color)}</div>;
};

class DataStore extends Component {
  render() {
    return (
      <>
        <h2>STORE 1</h2>
        <button onClick={() => this.props.getToken("ask for token")}>Server</button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(authActions, dispatch);
export default connect(null, mapDispatchToProps)(DataStore);
