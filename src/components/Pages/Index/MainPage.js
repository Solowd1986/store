import React, { Component } from "react";
import * as PropTypes from "prop-types";

import PromoBadge from "@components/Partials/PromoBadge/PromoBadge";
import withModal from "@components/Helpers/Hoc/withModal/withModal";
import Spinner from "@components/Partials/Spinner/Spinner";

import { bindActionCreators } from "redux";
import * as serverActions from "@redux/entities/server/actions";
import * as serverSelectors from "@redux/entities/server/selectors/serverSelectors";
import { connect } from "react-redux";
import About from "./About/About";
import Announcements from "./Announcements/Announcements";
import BrandStory from "./BrandStory/BrandStory";
import Promo from "./Promo/Promo";
import Slider from "./Slider/Slider";

class MainPage extends Component {
    static propTypes = {
        index: PropTypes.object,
        slider: PropTypes.array,
    };

    componentDidMount() {
        this.props.fetchPageData(this.props);
    }

    render() {
        const SpinnerModal = withModal(Spinner, { bg: false, interactionsDisabled: true, });
        if (!this.props.index) return <SpinnerModal/>;
        return (
            <>
                <Slider slides={this.props.index.slider}/>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPageData: serverActions.fetchPageData }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
