import React, { Component, PureComponent } from "react";

import * as serverSelectors from "@redux/entities/server/selectors/serverSelectors";
import { bindActionCreators } from "redux";
import * as authActions from "@redux/entities/auth/actions";
import { connect } from "react-redux";

export const Alert = ({ children }) => {
    const color = "red";
    return <div>{children(color)}</div>;
};

export class DataStore2 extends PureComponent {
    state = {
        users: {
            base: [{ name: "bob" }, { name: "stan" }, { name: "dan" }, { name: "glenn" }],
        },
    };

    changeSome = () => {
        console.log(11);

        const res = { ...this.state.users.base[1] };
        res.name = "not stan";
        const star = [...this.state.users.base];
        //const index = this.state.users.indexOf(ythis.state)

        const result = [...star.slice(0, 1), res, ...star.slice(1 + 1)];

        this.setState({
            users: {
                base: result,
            },
        });
    };
    render() {
        console.log("render SOME");

        return (
            <>
                <button onClick={this.changeSome}>Change</button>
            </>
        );
    }
}

class DataStore extends Component {
    render() {
        return (
            <>
                <h2>STORE 1</h2>
                <button onClick={() => this.props.getToken("ask for token")}>Server</button>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(authActions, dispatch);
export default connect(null, mapDispatchToProps)(DataStore);
