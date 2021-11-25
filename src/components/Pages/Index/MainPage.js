import React, { Component, useEffect, useState, useRef } from "react";
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
import { AppHook } from "@components/T_Not Project Files/Hook/HookTest/HookTest.js";
import ModalWrapper from "@components/Helpers/Hooks/ModalWrapper/ModalWrapper";
import Confirm from "@components/Pages/Order/Confirm/Confirm";

import { Redirect } from "react-router-dom";




function Counter() {
    console.log('exec Counter');
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);
    console.log('prev', prevCount);

    console.log('end line of two');
    return (
        <>
            <h1>Now: {count}, before: {prevCount}</h1>;
            <button onClick={() => setCount(count + 1)}>Change</button>
        </>
    )
}

function usePrevious(value) {
    console.log('exec usePrevious');

    const ref = useRef();
    useEffect(() => {
        console.log('start effect');
        ref.current = value;
    });
    return ref.current;
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



                {/*<Wrapped bg interactions/>*/}
                <AppHook/>
                <Counter/>

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
