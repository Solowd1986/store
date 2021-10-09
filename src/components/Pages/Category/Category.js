import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";

import CategoryProductsList from "./CategoryProductsList/CategoryProductsList";
import Spinner from "@components/Partials/Spinner/Spinner";
import withModal from "@components/Helpers/Hoc/withModal/withModal";

import { bindActionCreators } from "redux";
import * as serverActions from "@redux/entities/server/actions";
import * as sortActions from "@redux/entities/sort/actions";
import * as lazyActions from "@redux/entities/lazy/actions";

import * as serverSelectors from "@redux/entities/server/selectors/serverSelectors";
import * as lazySelectors from "@redux/entities/lazy/selectors/lazySelectors";
import * as sortSelectors from "@redux/entities/sort/selectors/sortSelectors";
import { connect } from "react-redux";

import arrayShuffle from "@components/Helpers/Functions/arrayShuffle";
import produce from "immer";


class Category extends PureComponent {
    static propTypes = {
        clearCategoryPageReduxData: PropTypes.func,
        clearLazyReduxData: PropTypes.func,
        fetchPageData: PropTypes.func,
        sortType: PropTypes.string,
        discardSortType: PropTypes.func,
        lastIndex: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            lastIndex: 0,
        };
    }

    isStateEmpty = () => !this.state.products;
    sortProductsList = () => {
        let productsList = [...this.state.products.data];
        switch (this.props.sortType) {
            case "по возрастанию цены": {
                productsList.sort((a, b) => a.price - b.price);
                break;
            }
            case "по убыванию цены": {
                productsList.sort((a, b) => b.price - a.price);
                break;
            }
            default: {
                productsList = arrayShuffle(productsList);
                break;
            }
        }
        this.setState(
            produce(this.state, (draft) => {
                draft["products"].data = productsList;
            }),
        );
    };
    clearReduxState = () => {
        this.props.clearCategoryPageReduxData();
        this.props.clearLazyReduxData();
        this.props.discardSortType();
    };
    isRouteChanged = () => !this.isStateEmpty() ? this.state.products.main.alias !== this.props.match.params.type : false;
    isLazyLoadRecived = () => !this.isStateEmpty() && (this.state.lastIndex !== this.props.lastIndex) && this.props.lazy;


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.isStateEmpty() && this.props.category) this.setState((state) => ({ products: this.props.category }));

        if (this.isRouteChanged()) {
            this.setState((state) => ({ products: null, lastIndex: 0 }));
            this.clearReduxState();
            this.props.fetchPageData(this.props);
        }

        if (this.isLazyLoadRecived()) {
            this.setState(
                produce(this.state, (draft) => {
                    draft["lastIndex"] = this.props.lastIndex;
                    draft["products"]["main"] = this.state.products.main;
                    draft["products"]["data"] = [
                        ...this.state.products.data,
                        ...this.props.lazy,
                    ];
                }),
            );
        }

        if (prevProps.sortType !== this.props.sortType && !this.isStateEmpty()) {
            this.sortProductsList();
        }
    }


    componentDidMount() {
        this.props.fetchPageData(this.props);
    }

    componentWillUnmount() {
        this.clearReduxState();// очистка redux-state при каждом размонтировании компонента
    }

    render() {
        //console.log('render');
        if (this.isStateEmpty()) {
            const SpinnerModal = withModal(Spinner, { bg: false, interactionsDisabled: true, });
            return <SpinnerModal />;
        }
        const { main: category, data: products } = this.state.products;
        return <CategoryProductsList category={category} products={products} />;
    }
}

const mapStateToProps = (state) => {
    return {
        category: serverSelectors.serverCategorySelector(state),
        lazy: lazySelectors.getRecivedData(state),
        lastIndex: lazySelectors.getLastIndexSelector(state),
        sortType: sortSelectors.sortTypeSelector(state),
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...serverActions, ...sortActions, ...lazyActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Category);
