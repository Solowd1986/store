import React, { Component } from "react";

import ScrollToTop from "@components/Helpers/Hoc/withScrollToTop/ScrollToTop";
import UpButton from "@components/Partials/UpButton/UpButton";
import Header from "@components/Partials/Header/Header";
import Footer from "@components/Partials/Footer/Footer";
import styles from "./layout.module.scss";
import { connect } from "react-redux";


// @ts-ignore
const Layout = ({ children , dataFetch}:{ children: React.ReactNode, dataFetch:boolean }) => {

    console.log(dataFetch);

    return (
    <div className={styles.layout}>
        <UpButton />
        <Header isFetch={dataFetch}/>
        <ScrollToTop>
            <main className={styles.main}>
                {children}
            </main>
        </ScrollToTop>
        <Footer />
    </div>
)};

const mapStateToProps = (state:any) => ({dataFetch: state.server.fetchingDataStart});
export default connect(mapStateToProps)(Layout);

//export default Layout;
