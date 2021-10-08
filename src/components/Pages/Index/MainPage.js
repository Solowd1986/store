import React, { Component, PureComponent, createRef, useRef, useState } from "react";
import cn from "classnames";
import * as PropTypes from "prop-types";

import Spinner from "@components/Partials/Spinner/Spinner";
import Slider from "./Slider/Slider";
import Promo from "./Promo/Promo";
import BrandStory from "./BrandStory/BrandStory";
import Announcements from "./Announcements/Announcements";
import About from "./About/About";
import PromoBadge from "@components/Partials/PromoBadge/PromoBadge";
import withModal from "@components/Helpers/Hoc/withModal/withModal";


import { bindActionCreators } from "redux";
import * as serverActions from "@redux/entities/server/actions";
import * as serverSelectors from "@redux/entities/server/selectors/serverSelectors";
import { connect } from "react-redux";


import { HookTest } from "@components/test/Hoocs/HookTest/HookTest.js";




// const FooObject = {
//     basicFoo: function () {
//         console.log(this);
//     },
//     arrowFoo: () => {
//         console.log(this);
//     },
//     innerFoo: () => {
//         const innerFooCode = () => console.log(this);
//         innerFooCode();
//     }
// };
//
// FooObject.basicFoo();
// FooObject.arrowFoo();
// FooObject.innerFoo();




class CompOne extends Component{
    constructor(props) {
        super(props);
        //console.log('comp one cons');
    }


    render() {
        //console.log('render');

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
        //console.log('comp two cons');
    }

    render() {
        //console.log('render 2');

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


    render() {
        const SpinnerModal = withModal(Spinner, { bg: false, interactionsDisabled: true });
        if (!this.props.main.index) return <SpinnerModal/>;
        const { index, index: { slider }} = this.props.main;

        return (
            <>
                <Slider slides={slider}/>

                <CompOne />


                <HookTest/>

                <Promo index={index}/>
                <BrandStory/>
                <Announcements/>
                <About/>
                <PromoBadge/>
            </>
        );
    }
}


const mapStateToProps = (state) => ({ main: serverSelectors.serverIndexSelector(state) });
const mapDispatchToProps = (dispatch) => bindActionCreators(serverActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
