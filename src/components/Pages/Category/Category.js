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

    //region Описание
    /**
     * componentDidUpdate отслеживает 4 ситуации:
     * 1. State компонента пуст (то есть это первый вход в блок категорий). Тогда просто при получении props - вписываем данные.
     * 2. Смена типа сортировки. По умолчанию тип сортировки приходит из Redux (иницилизирующее значение) Если state не пуст,
     *    и тип сортировки пришедший в props отличается - то меняем порядок элементов в текущем state. Проверка на пустоту state нужна,
     *    так как при переходе между категориями тип сортировки сбрасывает на стандартный). Это ведет к вызове метода сортировки, но
     *    также при переходе между категориями сбрасывается state, а значит, нет данных для сортировки. Потому и нужна проверка.
     * 3. Смена route-пути. Это происходит лишь в рамках уже загруженного компонента, а значит, state должен быть не пуст. В этом
     *    случае проверяем alias текущей категории и поле match из props, если они разные - были переходы в рамках компонента.
     * 4. Получены доп. данные lazyLoad. Опять же, доп. данные могут быть получены только для уже загруженного компонента. Также
     *    проверяем, не пуст ли блок lazy из Redux и главное: разницу индексов. Изначально индексы равны: 0 тут в state и
     *    0 в Redux store. Но когда данные получены, индекс в Redux store меняется и прихоидт в виде props. Как результат - мы
     *    дополняем state данными, и устанавливаем новый index для state. Теперь в условие не попадем, пока не придет новый
     *    индекс.
     */
    //endregion
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.isStateEmpty() && this.props.category) this.setState((state) => ({ products: this.props.category }));

        if (!this.isStateEmpty() && prevProps.sortType !== this.props.sortType) this.sortProductsList();

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
    }

    componentDidMount() {
        this.props.fetchPageData(this.props);
    }

    componentWillUnmount() {
        this.clearReduxState();// очистка redux-state при каждом размонтировании компонента
    }

    render() {
        //console.log('render');
        //console.log(this.props);
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
