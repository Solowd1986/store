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

import Breadcrumbs from "@components/T_Not Project Files/Breadcrumbs/Breadcrumbs";

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


import { useRouteMatch, useLocation } from "react-router-dom";

const Roo = () => {


    return (
        <div>
            <div>This is the user page</div>
        </div>
    );
};


const foo = <T,>(data:T):T => data;
foo("ad");







const MainPage = ({ index, error, fetchIndexPageData, clearIndexReduxState }: IMainPageProps):JSX.Element => {


    useEffect(() => {
        fetchIndexPageData();
    }, [fetchIndexPageData]);


    /**
     * Два блока ниже - useEffect и if (error.recived) работают вместе и их порядок важен, так как есть return, а код
     * должен быть достижим. Итак, проблема в редиректе в том, что для каждой страницы, которая обращается к серверу
     * есть переход на страницу 500, если сервер не ответил, и статус этой ошибки хранится в Redux. Если его не сбросить,
     * то каждый переход на такую страницу будет провоцировать редирект.
     * Поэтому, если ошибка получена, мы сначала вызываем соответствующий метод сброса для Redux полей ошибки
     * такой страницы, а уже потом выполняем редирект.
     * */
    useEffect(() => {
        if (error.recived) {
            clearIndexReduxState();
        }
    }, [error.recived]);
    if (error.recived) return <Redirect to={error.code}/>;



    if (!index) {
        const SpinnerModal = ModalWrapper(Spinner);
        return <SpinnerModal/>
    }
    return (
        <>
            <Slider slides={index.slider}/>

            <PageForGuest/>
            <Breadcrumbs/>

            <Roo/>

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
