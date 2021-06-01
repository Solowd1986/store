import React, { Component } from "react";

import Layout from "@components/Partials/Layout/Layout";
import ErrorBoundary from "@components/Helpers/ErrorBoundary/ErrorBoundary";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@redux/store";
import router from "@root/routes/routes";

export default class App extends Component {
    render(): React.ReactNode {
        return (
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <ErrorBoundary>
                            <Layout>
                                <Switch>
                                    {router.map((route) => (
                                        <Route
                                            key={route.url}
                                            path={route.url}
                                            component={route.component}
                                            exact={route.exact}
                                        />
                                    ))}
                                    <Redirect to="/404"/>
                                </Switch>
                            </Layout>
                        </ErrorBoundary>
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
        );
    }
}
