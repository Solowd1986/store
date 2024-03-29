import React from "react";

import Layout from "@components/Partials/Layout/Layout";
import ErrorBoundary from "@components/Helpers/ErrorBoundary/ErrorBoundary";
import ScrollToTop from "@components/Helpers/Hooks/ScrollToTop/ScrollToTop";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "@redux/store";
import routes from "@root/components/App/routes/routes";


const App = (): JSX.Element => (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ErrorBoundary>
                    <Layout>
                        <ScrollToTop/>
                        <Switch>
                            {routes.map((route) => (
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

export default App;


