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






import {HookOne} from "@components/test/Hoocs/Hoocs";


const ThemeContext = React.createContext('light');

class Toolbar extends React.Component{
    render() {
        return (

                <Toolbar2 />

        );
    }
}

class Toolbar2 extends React.Component{
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
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}


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
        if (!this.props.index) return <SpinnerModal />;
        return (
            <>
                <Slider slides={this.props.index.slider} />
                <Lock/>

                <MyContext.Provider value={"blow"}>
                    <HookOne/>
                </MyContext.Provider>

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
