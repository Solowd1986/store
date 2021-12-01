import React, { Component, createRef, useEffect, useRef } from "react";
import styles from "./tabs.module.scss";
import cn from "classnames";

import Features from "./Features/Features";
import Specification from "./Specification/Specification";
import ProductDelivery from "./ProductDelivery/ProductDelivery";


const ProductTabs = (props: any) => {

    const tabLinkList = useRef<HTMLElement>(null);
    const tabBodyList = useRef<HTMLUListElement>(null);


    useEffect(() => {
        if (!tabLinkList.current || !tabBodyList.current) return;
        const animationList = ["animate__fadeIn", "animate__animated", "animate__fast"];
        tabLinkList.current.children[0].classList.add(styles.link_active);
        tabBodyList.current.children[0].classList.add(styles.tab_active);
        Array.from(tabBodyList.current.children).forEach((item) => item.classList.add(...animationList));
    });


    const tabClickHandler = ({ target, target: { dataset: { tab: data } } }: any) => {
        if (!tabLinkList.current || !tabBodyList.current) return;
        const tabLinkListArray = Array.from(tabLinkList.current.children);
        const tabBodyListArray = Array.from(tabBodyList.current.children);
        if (target.classList.contains(styles.link_active)) return;

        tabLinkListArray.forEach((item: any) => item.classList.remove(styles.link_active));
        target.classList.add(styles.link_active);
        tabBodyListArray.forEach((item: any) => {
            item.classList.remove(styles.tab_active);
            if (item.id === data) item.classList.add(styles.tab_active);
        });
    };

    const { category: { alias }, product: { promo, specifications = null } } = props;


    return (
        <section className={cn("wrapper", styles.info)}>
            <nav className={styles.info__nav} ref={tabLinkList}>
                    <span onClick={tabClickHandler}
                          className={cn(styles.info__nav_link)}
                          data-tab={"features"}>
                        Описание
                    </span>
                {alias === "phones" && (
                    <span onClick={tabClickHandler}
                          className={cn(styles.info__nav_link)}
                          data-tab={"specifications"}>
                            Характеристики
                        </span>
                )}
                <span onClick={tabClickHandler}
                      className={cn(styles.info__nav_link)}
                      data-tab={"shipping"}>
                        Доставка и оплата
                    </span>
            </nav>

            <div className={"container"}>
                <ul ref={tabBodyList}>
                    <li className={styles.tab} id={"features"}>
                        <Features promo={promo}/>
                    </li>
                    {alias === "phones" && (
                        <li className={styles.tab} id={"specifications"}>
                            <Specification specifications={specifications}/>
                        </li>
                    )}
                    <li className={styles.tab} id={"shipping"}>
                        <ProductDelivery/>
                    </li>
                </ul>
            </div>
        </section>
    );
};


//
// class ProductTabs extends Component {
//     constructor(props) {
//         super(props);
//         this.tabLinkList = createRef();
//         this.tabBodyList = createRef();
//     }
//
//     componentDidMount() {
//         const animationList = ["animate__fadeIn", "animate__animated", "animate__fast"];
//         this.tabLinkList.current.children[0].classList.add(styles.link_active);
//         this.tabBodyList.current.children[0].classList.add(styles.tab_active);
//         Array.from(this.tabBodyList.current.children).forEach((item) => item.classList.add(...animationList));
//     }
//
//     tabClickHandler = ({ target, target: { dataset: { tab: data } } }) => {
//         const tabLinkList = Array.from(this.tabLinkList.current.children);
//         const tabBodyList = Array.from(this.tabBodyList.current.children);
//         if (target.classList.contains(styles.link_active)) return;
//
//         tabLinkList.forEach((item) => item.classList.remove(styles.link_active));
//         target.classList.add(styles.link_active);
//         tabBodyList.forEach((item) => {
//             item.classList.remove(styles.tab_active);
//             if (item.id === data) item.classList.add(styles.tab_active);
//         });
//     };
//
//     render() {
//         const { category: { alias }, product: { promo, specifications = null } } = this.props;
//
//         //console.log(promo);
//
//         return (
//             <section className={cn("wrapper", styles.info)}>
//                 <nav className={styles.info__nav} ref={this.tabLinkList}>
//                     <span onClick={this.tabClickHandler}
//                           className={cn(styles.info__nav_link)}
//                           data-tab={"features"}>
//                         Описание
//                     </span>
//                     {alias === "phones" && (
//                         <span onClick={this.tabClickHandler}
//                               className={cn(styles.info__nav_link)}
//                               data-tab={"specifications"}>
//                             Характеристики
//                         </span>
//                     )}
//                     <span onClick={this.tabClickHandler}
//                           className={cn(styles.info__nav_link)}
//                           data-tab={"shipping"}>
//                         Доставка и оплата
//                     </span>
//                 </nav>
//
//                 <div className={"container"}>
//                     <ul ref={this.tabBodyList}>
//                         <li className={styles.tab} id={"features"}>
//                             <Features promo={promo} />
//                         </li>
//                         {alias === "phones" && (
//                             <li className={styles.tab} id={"specifications"}>
//                                 <Specification specifications={specifications} />
//                             </li>
//                         )}
//                         <li className={styles.tab} id={"shipping"}>
//                             <ProductDelivery />
//                         </li>
//                     </ul>
//                 </div>
//             </section>
//         );
//     }
// }

export default ProductTabs;
