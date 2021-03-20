import React, { Component } from "react";

export default function withMsg(PropsComponent) {
    return class extends PropsComponent {
        constructor(props) {
            console.log('outer props', props);
            super(props);
            this.state = { loaded: false };
        }

        render() {
            if (this.state.loaded) {
                return super.render();
            }
            return <div>...loaded...</div>;
        }
    }
}


