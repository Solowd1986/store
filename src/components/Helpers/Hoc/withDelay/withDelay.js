import React, { Component } from "react";
import Spinner from "@components/Partials/Spinner/Spinner";
import * as util from "@components/Helpers/Functions/scrollbarHelper";

function withDelay(PropsComponent, ms = 1500) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.timer = null;
      this.state = { isDelayEnded: false };
    }

    componentDidMount() {
      util.addScrollbarOffset();
      this.timer = setTimeout(() => {
        this.setState((state) => {
          return {
            isDelayEnded: true,
          };
        });
      }, ms);
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    render() {
      if (!this.state.isDelayEnded)
        return (
          <div className="overlay">
            <Spinner />
          </div>
        );
      return <PropsComponent />;
    }
  };
}

export default withDelay;
