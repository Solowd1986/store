import React, { Component } from 'react';

function withHandlers(handlers) {
    return function (PropsComponent) {
        const api = 'api';
        return class withHandlers extends Component {
            render() {
                return <PropsComponent api={api} handlers={handlers} />;
            }
        };
    };
}

class FormAuth extends Component {
    render() {
        console.log(this.props);
        return <p>Hello</p>;
    }
}

export default withHandlers({
    fields: {
        email: 'email',
        imput: 'login',
    },
    onClick: (evt) => console.log(evt),
})(FormAuth);
