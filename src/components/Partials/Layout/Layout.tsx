import React, { Component } from "react";

import ScrollToTop from "@components/Helpers/Hoc/withScrollToTop/ScrollToTop";
import UpButton from "@components/Partials/UpButton/UpButton";
import Header from "@components/Partials/Header/Header";
import Footer from "@components/Partials/Footer/Footer";
import styles from "./layout.module.scss";


// @ts-ignore
const Layout = ({ children }:{ children: React.ReactNode }) => (
    <div className={styles.layout}>
        <UpButton />
        <Header />
        <ScrollToTop>
            <main className={styles.main}>
                {children}
            </main>
        </ScrollToTop>
        <Footer />
    </div>
);


export default Layout;
