import React, { Component } from "react";
import * as PropTypes from "prop-types";

import Spinner from "@components/Partials/Spinner/Spinner";
import Slider from "./Slider/Slider";
import Promo from "./Promo/Promo";
import BrandStory from "./BrandStory/BrandStory";
import Announcements from "./Announcements/Announcements";
import About from "./About/About";
import PromoBadge from "@components/Partials/PromoBadge/PromoBadge";


import * as indexActions from "@redux/entities/index/actions";
import * as indexSelectors from "@redux/entities/index/selectors/indexSelectors";
import { connect } from "react-redux";


//import { HookTest } from "@components/test/Hoocs/HookTest/HookTest.js";
import { AppHook } from "@components/test/Hoocs/HookTest/HookTest.js";
import ModalWrapper from "@components/Helpers/Hooks/ModalWrapper/ModalWrapper";
import Confirm from "@components/Pages/Order/Confirm/Confirm";

import { Redirect } from "react-router-dom";





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
        this.props.fetchIndexPageData(this.props);
    }



    render() {
        const Wrapped = ModalWrapper(Confirm);
        if (this.props.error.recived) return <Redirect to={this.props.error.code}/>;

        if (!this.props.index) {
            const SpinnerModal = ModalWrapper(Spinner);
            return <SpinnerModal/>
        }
        const { index, index: { slider }} = this.props;

        return (
            <>
                <Slider slides={slider}/>


                <Wrapped bg interactions/>
                <AppHook/>

                <Promo index={index}/>
                <BrandStory/>
                <Announcements/>
                <About/>
                <PromoBadge/>
            </>
        );
    }
}

const mapStateToProps = (state) => indexSelectors.getIndexData(state);
export default connect(mapStateToProps, indexActions)(MainPage);
