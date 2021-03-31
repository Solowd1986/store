import React, { Component } from "react";
import Error400 from "@components/Pages/Error/Error400/Error400";
import * as PropTypes from "prop-types";

class ErrorBoundary extends Component {
    static propTypes = {
        children: PropTypes.node,
    };

    state = {
        hasError: false,
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log("Catch Bound Error. \nLog:");
        console.log(errorInfo.componentStack);
    }

    resetErrorState = () => this.setState({ hasError: false });

    render() {
        if (this.state.hasError) {
            return <Error400 resetErrorState={this.resetErrorState} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
