import React from "react";
import styles from "./layout.module.scss";

import UpButton from "@components/Partials/UpButton/UpButton";
import Header from "@components/Partials/Header/Header";
import Footer from "@components/Partials/Footer/Footer";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <div className={styles.layout}>
        <Header/>
        <main className={styles.main}>
            {children}
        </main>
        <UpButton/>
        <Footer/>
    </div>
);

export default Layout;
