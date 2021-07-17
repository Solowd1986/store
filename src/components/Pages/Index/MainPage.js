import React, { Component, PureComponent, createRef, useRef, useState } from "react";
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


import { HookOne } from "@components/test/Hoocs/Hoocs";

import styles from "./Promo/promo.module.scss";



import {TransitionGroup, CSSTransition}  from "react-transition-group";



const ThemeContext = React.createContext('light');

class Toolbar extends React.Component {
    render() {
        return (

            <Toolbar2/>

        );
    }
}

class Toolbar2 extends React.Component {
    static contextType = ThemeContext;

    render() {
        return (
            <div>
                {this.context}
            </div>
        )
    }
}


class Lock extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value={"ThemeContext"}>
                <Toolbar/>
            </ThemeContext.Provider>
        );
    }
}







const ItemUser = ({user: {id, name}, removeItem, refGet}) => {
    const inputEls = createRef();

    return (
        <CSSTransition key={id} nodeRef={refGet} classNames="my-node" timeout={1000} >
            <li ref={refGet} onClick={() => removeItem(id)}>{name}</li>
        </CSSTransition>
    )
};




const Lockster = () => {
    const [toggleStatus, toggleChange] = useState(true);
    const inputEl = useRef(null);
    const inputEl2 = useRef(null);


    const [usersList, changeList] = useState([
        { id: 1, name: "bob"},
        { id: 2, name: "stan"},
        { id: 3, name: "glen"},
    ]);


    const removeItem = (id) => {
        changeList(usersList.filter(item => item.id !== id));
    };



    const addItem = () => {
        const id = Math.random() * 1000;
        const s = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];

        let name = "";
        for (let i = 5; --i;) {
            name += s[Math.floor(Math.random() * s.length - 1)];
        }

        const user = {id, name };
        changeList(usersList.concat([user]));
    };




    return (
        <div>
            <div onClick={() => toggleChange(!toggleStatus)} style={{margin: "20px"}}>
                <button>Toggle</button>
            </div>

            <div>
                <CSSTransition  in={toggleStatus} timeout={500} classNames="my-node" unmountOnExit>

                    <div ref={inputEl} className="test_1" style={{
                        height: "200px",
                        width: "50%",
                        // justifyContent: "center",
                        // alignItems: "center",
                        fontWeight: "bold",
                        color: "white",
                        textTransform: "uppercase",

                        fontSize: "25px",
                        // margin: "0 auto",
                        backgroundColor: "red",
                        // display: `${toggleStatus ? "flex" : "none"}`
                    }}>

                        {toggleStatus.toString()}

                    </div>
                </CSSTransition>
            </div>

            <div>
                <button onClick={addItem}>Add</button>
            </div>
            <div>

                <TransitionGroup component="ul">
                    {
                        usersList.map(item =>

                        {
                            const itemRef = createRef();


                              return  (

                            <ItemUser key={item.id} user={item} removeItem={removeItem} refGet={itemRef}/>


                            /*<CSSTransition nodeRef={itemRef} classNames="my-node" timeout={1000} key={item.id} >
                                <li ref={itemRef} onClick={() => removeItem(item.id)}>{item. name}</li>
                            </CSSTransition>*/
                        )}


                        )
                    }
                </TransitionGroup>

            </div>



        </div>
    );


};


const ModalEffectHook = () => {
    return (
        <div>
            <div className={styles.modalEff}>

            </div>
            <div>
                <button>
                    Show Modal
                </button>
            </div>
        </div>
    )
};


export const MyContext = React.createContext(null);

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
        if (!this.props.index) return <SpinnerModal/>;

        return (
            <>
                <Slider slides={this.props.index.slider}/>
                <Lock/>
                <Lockster/>

                <ModalEffectHook/>


                <MyContext.Provider value={"blow"}>
                    <HookOne/>
                </MyContext.Provider>

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
