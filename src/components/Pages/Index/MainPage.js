import React, { Component, PureComponent, createRef, useRef, useState } from "react";
import cn from "classnames";

import * as PropTypes from "prop-types";

import withModal from "@components/Helpers/Hoc/withModal/withModal";

import Spinner from "@components/Partials/Spinner/Spinner";
import Slider from "./Slider/Slider";
import Promo from "./Promo/Promo";
import BrandStory from "./BrandStory/BrandStory";
import Announcements from "./Announcements/Announcements";
import About from "./About/About";
import PromoBadge from "@components/Partials/PromoBadge/PromoBadge";

import { bindActionCreators } from "redux";
import * as serverActions from "@redux/entities/server/actions";
import * as serverSelectors from "@redux/entities/server/selectors/serverSelectors";
import { connect } from "react-redux";




import { HookTest } from "@components/test/Hoocs/HookTest/HookTest.js";

class CompOne extends Component{
    constructor(props) {
        super(props);
        console.log('comp one cons');
    }


    render() {
        console.log('render');

        return (
            <div>
                <button onClick={() => this.forceUpdate()}>Rerender</button>
                <CompTwo/>
            </div>
        )
    }
}

class CompTwo extends Component{
    constructor(props) {
        super(props);
        console.log('comp two cons');
    }

    render() {
        console.log('render 2');

        return (
            <div>
                <span>two</span>
            </div>
        )
    }
}




class MainPage extends Component {
    static propTypes = {
        index: PropTypes.object,
        slider: PropTypes.array,
    };

    componentDidMount() {
        this.props.fetchPageData(this.props);
    }


    sells = (multipler) => (number) => {
        return Math.pow(number, multipler);
    };


    celss = this.sells(2);


    render() {
        const SpinnerModal = withModal(Spinner, { bg: false, interactionsDisabled: true });
        if (!this.props.index) return <SpinnerModal/>;

        return (
            <>
                <Slider slides={this.props.index.slider}/>
                {this.celss(3)}

                <CompOne />



                <HookTest/>

                <Promo index={this.props.index}/>
                <BrandStory/>
                <Announcements/>
                <About/>
                <PromoBadge/>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        index: serverSelectors.serverIndexSelector(state),
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(serverActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
