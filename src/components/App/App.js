import React, { Component } from "react";

import Layout from "@components/Partials/Layout/Layout";
import ErrorBoundary from "@components/Helpers/ErrorBoundary/ErrorBoundary";
import ScrollToTop from "@components/Helpers/Hoc/withScrollToTop/ScrollToTop";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import getRoutes from "@root/routes/routes";
import { Provider } from "react-redux";
import store from "@redux/store";
import { List, Map } from "immutable";



const state = List([
    Map({
      name: "glen"
    }),
    Map({
      name: "stan"
    }),
]);

const store2 = state.setIn([0, "name"], "deo");

//console.log(store2.get(0).get("name"));
//console.log(store2.getIn([0, "name"]));


let arrayblock = ["Bob", "Stan", "Bill"];
const res = arrayblock.splice();

//console.log(res);

//const elem = arrayblock[Math.floor(Math.random() * arrayblock.length)];
//console.log(elem);



const state3 = Map({
  users: List([
      Map({
        age: 17
      }),
      Map({
        age: 19
      }),
      Map({
        age: 27
      }),
  ])
});
const state4 = state3.setIn(["users"], state3.get("users").push(Map({age: 44})));

//console.log(state4.getIn(["users", 3, "age"]));


const isAuth = true;

export default class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <Provider store={store} value="Provide">
          <BrowserRouter>
            <ErrorBoundary>
              <Layout>
                <ScrollToTop>
                  <Switch>
                    {getRoutes(isAuth).map((route) => (
                      <Route key={route.url} path={route.url} component={route.component} exact={route.exact} />
                    ))}
                    <Redirect to="/404" /> {/* редирект, если рута не нашлось */}
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
