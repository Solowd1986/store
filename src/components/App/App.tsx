import React, { Component } from "react";

import Layout from "@components/Partials/Layout/Layout";
import ErrorBoundary from "@components/Helpers/ErrorBoundary/ErrorBoundary";
import ScrollToTop from "@components/Helpers/Hoc/withScrollToTop/ScrollToTop";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import router from "@root/routes/routes";
import { Provider } from "react-redux";
import store from "@redux/store";


export default class App extends Component {
    render(): React.ReactNode {
        return (
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <ErrorBoundary>
                            <Layout>
                                <ScrollToTop>
                                    <Switch>
                                        {router.map((route) => (
                                            <Route
                                                key={route.url}
                                                path={route.url}
                                                component={route.component}
                                                exact={route.exact}
                                            />
                                        ))}
                                        <Redirect to="/404" />
                                    </Switch>
                                </ScrollToTop>
                            </Layout>
                        </ErrorBoundary>
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
        );
    }
}
