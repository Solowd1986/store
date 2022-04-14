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




// TEST
import ScrollListInfinity from "@components/T_Not Project Files/Components Playground/ListScrollInfinity";
import ScrollListPagination from "@components/T_Not Project Files/Components Playground/ScrollListPagination";
import LoadingSpinner from "@components/T_Not Project Files/Components Playground/LoadingSpinner";
import PageForGuest from "@components/T_Not Project Files/Components Playground/PageForGuest";

interface IChildren {
    children? : React.ReactNode
}


function App({ children }: IChildren): JSX.Element {
    return (
        <div className={""}>
            {children}
        </div>
    )
}


function useIsMounted() {
    const [isMounted, setMountedSttaus] = useState(false);

    useEffect(() => {
        setMountedSttaus(true)
    }, []);

    return [isMounted]
}


const foo = <T,>(data:T):T => data;
foo("ad");







const MainPage = ({ index, error, fetchIndexPageData, clearIndexReduxState }: IMainPageProps):JSX.Element => {


    useEffect(() => {
        fetchIndexPageData();
    }, [fetchIndexPageData]);


    useEffect(() => {
        if (error.recived) {
            clearIndexReduxState();
        }
    }, [error.recived]);



    if (error.recived) {
        return <Redirect to={error.code}/>
    }




    if (!index) {
        const SpinnerModal = ModalWrapper(Spinner);
        return <SpinnerModal/>
    }
    return (
        <>
            <Slider slides={index.slider}/>

            <PageForGuest/>
            {/*<ScrollListInfinity/>*/}
            {/*<ScrollListPagination/>*/}
            {/*<LoadingSpinner width={10}/>*/}

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
