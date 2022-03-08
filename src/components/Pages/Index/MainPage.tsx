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
import ScrollList from "@components/T_Not Project Files/Components Playground/ListScroll";


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


function Hook() {
    const [isMounted] = useIsMounted();

    useEffect(() => {
        if (isMounted) console.log("mounted");
    })
}





const Pagination = () => {

    const [page, pageStatus] = useState(1);

    useEffect(() => {
        const res = getDatat(1);

    }, [page]);

    const getDatat = async (page: number) => {
        //const reposense = await axios.get(`site.ru/pages/${page}`);
        return page;
    };

    return (
        <div>
            <div>
                DATA
            </div>
            <div>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
            </div>
        </div>
    )
};


const PaginationInifinity = () => {
    return (
        <div>
            <div>
                DATA
            </div>
            <div>
                <button>Следующие товары</button>
            </div>
        </div>
    )
};






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

            <ScrollList/>



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
