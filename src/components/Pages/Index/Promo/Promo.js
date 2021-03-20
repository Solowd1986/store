import React, { Component } from "react";

import styles from "./promo.module.scss";
import cn from "classnames";
import * as PropTypes from "prop-types";

import ProductCard from "@components/Partials/ProductCard/ProductCard";
import Spinner from "@components/Partials/Spinner/Spinner";
import withModal from "@components/Helpers/Hoc/withModal/withModal";


import CartModal from "@components/Other/CartModal/CartModal";

import { NavLink } from "react-router-dom";

import DataStore from "../../../Test/DataStore";
import Stores from "../../../Test/Stores"


class Inner extends Component {
    render() {
        console.log(this.props);
        return (
            <section style={{ padding: "40px", color: "white", backgroundColor: "green" }}>
                HELLO
                <button onClick={this.props.closeModal}>Close</button>
            </section>
        );
    }
}



// import Confirm from "@components/Pages/Order/Confirm/Confirm";
// import withDelay from "@components/Helpers/Hoc/withDelay/withDelay";
// import Login from "@components/Other/Auth/Login";
// import produce from "immer";



class Promo extends Component {
    constructor(props) {
        super(props);
        this.state = { index: this.props.index }
    }

    // state = {
    //     index: null
    // };

    static propTypes = {
        index: PropTypes.object,
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (!this.state.index && this.props.index) {
    //         this.setState({ index: this.props.index })
    //     }
    // }


    componentWillUnmount() {
        this.setState({ index: null });
    }


    render() {


        //console.log(this.props);
        // localStorage.setItem("auth", JSON.stringify({
        //     token: "asrgretdvtyrty",
        //     user: "bob"
        // }));

        const SpinnerModal = withModal(Spinner, { bg: false, interactionsDisabled: true });

        if (!this.state.index) return <div className={styles.spin_wrap}><SpinnerModal/></div>;
        const { phones, accessoires, gadgets } = this.state.index;

        return (
            <section className={`container ${styles.wrapper}`}>
                <main className={`wrapper ${styles.content}`}>

                    {/*<NavLink to={"/secret"}>Go to secret page </NavLink>*/}
                    {/*<NavLink to={"/login"}>Go to login page </NavLink>*/}

                    {/*<FormikForm/>*/}

                    {/*<MyForm/>*/}

                    {/*<DataStore data={12}/>*/}

                    {/*<Stores/>*/}

                    {/*<ModalState/>*/}

                    {/*<Login/>*/}


                    {/*<button onClick={this.toggle}>Active</button>*/}

                    <h2 className={styles.section_title}>Рекомендуем</h2>
                    <ul className={styles.list}>
                        {phones.data.map(item => <ProductCard key={item.title + item.id} item={item} category={phones.main}/>)}
                    </ul>

                    <h2 className={styles.section_title}>Популярные гаджеты</h2>
                    <ul className={styles.list}>
                        {gadgets.data.map(item => <ProductCard key={item.title + item.id} item={item} category={gadgets.main}/>)}
                    </ul>

                    <h2 className={styles.section_title}>Аксессуары</h2>
                    <ul className={styles.list}>
                        {accessoires.data.map(item => <ProductCard key={item.title + item.id} item={item} category={accessoires.main}/>)}
                    </ul>
                </main>
            </section>
        )
    }
}

export default Promo;

