import React from "react";
import { BrowserRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";

import cn from "classnames";
import axios from "axios";
import { nanoid } from "nanoid";


const Category = () => {
    return (
        <div style={{textAlign: "center"}}>
            <div>
                <h3>Путь страниц:</h3>
                <div>-------</div>
            </div>
            <h2>THIS IS CATEGORY PAGE</h2>
            <div>
                <NavLink to="/item">
                    Перейти на страницу Item
                </NavLink>
            </div>
        </div>
    )
};

const Item = (props) => {
    //console.log(props);

    return (
        <div style={{textAlign: "center"}}>
            <div>
                <h3>Путь страниц:</h3>
                <div>-------</div>
            </div>
            <h2>THIS IS ITEM PAGE</h2>
            <NavLink to="/">Перейти на main страницу</NavLink>

        </div>
    )
};

const Index = () => {
    return (
        <div style={{textAlign: "center"}}>
            <div>
                <h3>Главная станица</h3>
            </div>
            <div>
                <NavLink to="/category">Перейти на страницу категорий</NavLink>
            </div>
        </div>
    )
};


const BreadcrumbsItem = (props) => {
    console.log('bread', props.match.url);

    return (<React.Fragment>
            <NavLink to={props.match.url}>
                <div>
                    Go to {props.match.url.substr(props.match.url.lastIndexOf('/')+1, props.match.url.length)}
                </div>
            </NavLink>
            <Route path={`${props.match.url}/:path`} component={BreadcrumbsItem} />
    </React.Fragment>
)};

const Breadcurmbs = () => {
    return (
        <div style={{textAlign: "center"}}>
            <BrowserRouter>



                    <Route path="/category" component={Category} exact/>
                    <Route path="/" component={Index} exact/>
                    <Route path="/item" component={Item} exact/>

                    <Route path='/:path' component={BreadcrumbsItem} exact/>


            </BrowserRouter>
        </div>
    )
};

export default Breadcurmbs;





