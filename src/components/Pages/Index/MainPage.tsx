import React, { useEffect, useState, useRef } from "react";
import { IMainPageProps } from "@root/types/index-page";

import Spinner from "@components/Partials/Spinner/Spinner";
import Slider from "./Slider/Slider";
import Promo from "./Promo/Promo";
import BrandStory from "./BrandStory/BrandStory";
import Announcements from "./Announcements/Announcements";
import About from "./About/About";
import PromoBadge from "@components/Partials/PromoBadge/PromoBadge";
import ModalWrapper from "@components/Helpers/Hooks/ModalWrapper/ModalWrapper";
import { Redirect } from "react-router-dom";

import * as indexActions from "@redux/entities/index/actions";
import * as indexSelectors from "@redux/entities/index/selectors/indexSelectors";
import { connect } from "react-redux";




function Counter2() {
    const [count, setCount] = useState(0);
    const state = useRef(count);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(state.current + 1);
            state.current = ++state.current;
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return <h1>{count}</h1>;
}





function Counter() {
    const [count, setCount] = useState(0);


    return(
        <div style={{ textAlign: "center"}}>
            <button style={{padding: "10px", backgroundColor: "red"}} onClick={() => setCount(count + 1)}>Inc</button>
            <h1>{count}</h1>
        </div>
    )
}







const MainPage = ({ index, error, fetchIndexPageData }: IMainPageProps):JSX.Element => {

    useEffect(() => {
        fetchIndexPageData();
    }, [fetchIndexPageData]);

    if (error.recived) return <Redirect to={error.code}/>;

    if (!index) {
        const SpinnerModal = ModalWrapper(Spinner);
        return <SpinnerModal/>
    }
    return (
        <>
            <Slider slides={index.slider}/>

            {/*<Counter2/>*/}

            <Promo index={index}/>
            <BrandStory/>
            <Announcements/>
            <About/>
            <PromoBadge/>
        </>
    );
};

const mapStateToProps = (state: unknown):unknown => indexSelectors.getIndexData(state);
export default connect(mapStateToProps, indexActions)(MainPage);
