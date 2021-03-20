import React, { Component } from "react";
import styles from "./layout.module.scss";

import UpButton from "@components/Partials/UpButton/UpButton";
import Header from "@components/Partials/Header/Header";
import Footer from "@components/Partials/Footer/Footer";

const Layout = ({ children }) => (
    <div className={styles.layout}>
        <UpButton/>
        <Header/>
        <main className={styles.main}>
            {children}
        </main>
        <Footer/>
    </div>
);

export default Layout;
