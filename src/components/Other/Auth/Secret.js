import React, { Component } from "react";

export default class Secret extends Component {
    render() {
        const { logged } = this.props;
        if (logged) return <div>SECRET</div>;
        return <div>NOT ALLOWED</div>;
    }
}


