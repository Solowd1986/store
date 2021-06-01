import React, { Component, PureComponent } from "react";
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




class Hect extends Component {
    componentDidMount() {
        console.log('hect mound');

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('hect upd');

    }

    rer = () => {
        this.forceUpdate();
    };
    render() {
        console.log('render');
        if (!this.names) return null;
        return (
            <div>
               Hello Hect

            </div>
        )
    }
}

class Sender extends Component{
    render() {
        return (
            <div style={{ backgroundColor: "grey"}}>
                <Hect/>
            </div>
        )
    }
}


import HookOne from "@components/test/Hoocs/Hoocs";





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
        if (!this.props.index) return <SpinnerModal />;
        return (
            <>
                <Slider slides={this.props.index.slider} />
                <Sender />
                <Promo index={this.props.index} />
                <BrandStory />
                <Announcements />
                <About />
                <PromoBadge />
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
