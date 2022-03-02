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


import styles from "./Slider/slider.module.scss"



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


const StoreD = React.memo((props) => {
    console.log('render', props);
    return (
        <div>
            1
        </div>
    )
});




class Logos extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>1</div>
        )
    }

}

const Grpu = () => {
    const [, setCnt] = useState(0);


    return (
        <div>
            <h1>START</h1>
            <div>
                <button onClick={() => setCnt((k) => k + 1)}>Re_Render</button>
            </div>
            {/*// @ts-ignore */}
            <StoreD name={"glow"}/>
        </div>
    )
};




const List1 = ():JSX.Element => {
    return (
        <div>
            <div>item1</div>
            <div>item2</div>
            <div>item3</div>
        </div>
    )
};

const List2 = ():JSX.Element => {
    return (
        <>
        <div>
            {}
            <div>
                <div>item4</div>
                <div>item5</div>
                <div>item6</div>
            </div>
        </div>

        </>
    )
};


function addName(str: any) {
    return str + " + name";
}

function capitalaize(str: any) {
    return str.toUpperCase();
}

const fns = [
    addName,
    capitalaize
];

const result = fns.reduce((sum, fn) => fn(sum), "start ");
console.log(result);





const Dropdown = ():JSX.Element => {
    const [isDropdownOpen, setSropdownStatus] = useState(false);


    // @ts-ignore
    const onClick = (evt: any): any => {
        console.log('list clicked');
        //console.log(evt.preventDefault());

        const arr = [
            evt.preventDefault,
        ];

        arr.reduce((summator, fn) => fn(summator), evt)



    };

    return (
        <>
            <div className={styles.wrp}>

            <div>
                <button onClick={() => setSropdownStatus(!isDropdownOpen)}>Open</button>
                <button onClick={onClick}>Check</button>
            </div>
            { isDropdownOpen && (
                <div className={styles.wrprel}>

                <div className={styles.list}>
                    <div>item4</div>
                    <div>item5</div>
                    <div>item6</div>
                </div>
                </div>
            )}
            </div>
        </>

    )
};





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

            <Dropdown/>
            {/*<Grpu/>*/}
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
