import React, { Component } from "react";
import classNames from "classnames";
import * as PropTypes from "prop-types";

export default function withStore(Props) {
  return class extends Component {
    api = () => {
      return "got some api";
    };

    render() {
      return (
        <Props
          hoc={{
            api: this.api,
            cn: classNames,
            PropTypes,
          }}
          {...this.props}
        />
      );
    }
  };
}
