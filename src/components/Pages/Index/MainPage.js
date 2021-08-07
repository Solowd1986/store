import React, { Component, PureComponent, createRef, useRef, useState } from "react";
import cn from "classnames";

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




const TestHook = () => {
    return (
        <div>
            <div className={styles.wrp}> </div>
            <div style={{textAlign: "center"}}>
                <button className={styles.btn_1}>start</button>

            </div>
        </div>
    )
};

const ModalEffectHook = () => {
    const [modal, toggleModal] = useState(false);


    const clasList = cn(styles.modalEff, {
        [styles.modal_styles]: modal,
        [styles["md-content"]]: modal,

    });


    return (
        <>
            <div className={cn(styles["md-modal"], styles["md-effect-1"], {
                [styles["md-show"]]: modal
            })} id="modal-1">
                <div className={styles["md-content"]}>
                    <h3>Modal Dialog</h3>
                    <div>
                        <p>This is a modal window. You can do the following things with it:</p>
                        <ul>
                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                        </ul>
                        <button onClick={() => toggleModal(false)} className="md-close">Close me!</button>
                    </div>
                </div>
            </div>


            <div style={{textAlign: "center"}}>
                <button onClick={() => toggleModal(!modal)} className={`md-trigger" data-modal="modal-1 ${styles.btn_mod}`}>Fade in &amp; Scale</button>
            </div>

        </>

    )
};


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

                <ModalEffectHook/>
                <TestHook/>

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
