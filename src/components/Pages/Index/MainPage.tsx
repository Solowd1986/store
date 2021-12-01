import React, { useEffect } from "react";

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
import { IMainPage } from "@root/ts/types/types";

const MainPage = ({ index, error, fetchIndexPageData }: IMainPage) => {

    useEffect(() => {
        fetchIndexPageData();
    }, []);

    if (error.recived) return <Redirect to={error.code}/>;

    if (!index) {
        const SpinnerModal = ModalWrapper(Spinner);
        return <SpinnerModal/>
    }

    return (
        <>
            <Slider slides={index.slider}/>
            <Promo index={index}/>
            <BrandStory/>
            <Announcements/>
            <About/>
            <PromoBadge/>
        </>
    );
};

const mapStateToProps = (state: unknown) => indexSelectors.getIndexData(state);
export default connect(mapStateToProps, indexActions)(MainPage);