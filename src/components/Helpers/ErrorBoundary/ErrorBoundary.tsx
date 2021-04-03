import React, { Component, ErrorInfo } from "react";
import Error400 from "@components/Pages/Error/Error400/Error400";

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError(): { hasError: boolean } | null {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(`Catch Bound Error. ${error} \nLog:`);
        console.log(errorInfo.componentStack);
    }

    resetErrorState = (): void => this.setState({ hasError: false });

    render(): React.ReactNode {
        if (this.state.hasError) {
            return <Error400 resetErrorState={this.resetErrorState} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
