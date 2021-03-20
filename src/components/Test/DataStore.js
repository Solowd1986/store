import React, { Component } from "react";

import classNames from "classnames";
import * as PropTypes from "prop-types";

import withStore from "./withStore";
import withMsg from "./withMsg";
import withParent from "@components/Test/withParent";

class DataStore extends Component {
    constructor(props) {
        console.log('props', props);
        super(props);
    }
    parentName = () => {
        return "Glow";
    };


    render() {
        return (
            <>
                <h2>STORE 1</h2>
            </>
        )
    }
}

export default withMsg(DataStore);


