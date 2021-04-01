import React, { Component, createRef } from 'react';
import styles from './tabs.module.scss';
import cn from 'classnames';

import Features from '../Features/Features';
import Specification from '../Specification/Specification';
import ProductDelivery from '../ProductDelivery/ProductDelivery';

class ProductTabs extends Component {
    constructor(props) {
        super(props);
        this.tabLinkList = createRef();
        this.tabBodyList = createRef();
        this.animationClassList = ['animate__fadeIn', 'animate__animated', 'animate__fast'];
    }

    componentDidMount() {
        Array.from(this.tabLinkList.current.children)[0].classList.add(styles.link_active);
        Array.from(this.tabBodyList.current.children)[0].classList.add(styles.tab_active);
        Array.from(this.tabBodyList.current.children).forEach((item) => item.classList.add(...this.animationClassList));
    }

    tabHandler = ({
        target,
        target: {
            dataset: { tab: data },
        },
    }) => {
        const tabLinkList = Array.from(this.tabLinkList.current.children);
        const tabBodyList = Array.from(this.tabBodyList.current.children);
        if (target.classList.contains(styles.link_active)) return;

        tabLinkList.forEach((item) => item.classList.remove(styles.link_active));
        target.classList.add(styles.link_active);
        tabBodyList.forEach((item) => {
            item.classList.remove(styles.tab_active);
            if (item.id === data) {
                item.classList.add(styles.tab_active);
            }
        });
    };

    render() {
        const {
            category: { alias },
            product: { promo, specifications = null },
        } = this.props;

        const tabLinkClassList = cn(styles.info__nav_link);
        const tabBodyClassList = cn(styles.tab);

        let phoneSpecsLink = null;
        let phoneSpecs = null;
        if (alias === 'phones') {
            phoneSpecsLink = (
                <span onClick={this.tabHandler} className={tabLinkClassList} data-tab={'spec'}>
                    Характеристики
                </span>
            );
            phoneSpecs = (
                <li className={tabBodyClassList} id={'spec'}>
                    <Specification specs={specifications} />
                </li>
            );
        }

        return (
            <section className={cn('wrapper', styles.info)}>
                <nav className={styles.info__nav} ref={this.tabLinkList}>
                    <span onClick={this.tabHandler} className={tabLinkClassList} data-tab={'desc'}>
                        Описание
                    </span>
                    {phoneSpecsLink}
                    <span onClick={this.tabHandler} className={tabLinkClassList} data-tab={'shipping'}>
                        Доставка и оплата
                    </span>
                </nav>

                <div className={'container'}>
                    <ul ref={this.tabBodyList}>
                        <li className={tabBodyClassList} id={'desc'}>
                            <Features promo={promo} />
                        </li>
                        {phoneSpecs}
                        <li className={tabBodyClassList} id={'shipping'}>
                            <ProductDelivery />
                        </li>
                    </ul>
                </div>
            </section>
        );
    }
}

export default ProductTabs;
