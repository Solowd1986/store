import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import * as PropTypes from "prop-types";

import CategoryProductsList from "./CategoryProductsList/CategoryProductsList";
import Spinner from "@components/Partials/Spinner/Spinner";
import ModalWrapper from "@components/Helpers/Hooks/ModalWrapper/ModalWrapper";

import * as categoryActions from "@redux/entities/category/actions";
import * as categorySelectors from "@redux/entities/category/selectors/categorySelectors";
import { connect } from "react-redux";

import arrayShuffle from "@components/Helpers/Functions/arrayShuffle";
import produce from "immer";


const CategoryFoo = () => {


};




class Category extends PureComponent {
    static propTypes = {
        clearCategoryPageReduxData: PropTypes.func,
        fetchCategoryPageData: PropTypes.func,
        clearCategoryReduxState: PropTypes.func,
        clearLazyReduxData: PropTypes.func,
        sortType: PropTypes.string,
        discardSortType: PropTypes.func,
        lastIndex: PropTypes.number,
    };

    state = {
        products: null,
        lastIndex: 0,
    };

    isStateEmpty = () => !this.state.products;
    sortProducts = () => {
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
    clearState = () => {
        this.setState((state) => ({ products: null, lastIndex: 0 }));
        this.props.clearCategoryReduxState();
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
     *    Может возникнуть вопрос: отчего не использовать для определения сортировки метод isRouteChanged? Проблема в том, что
     *    в рамках очики данных, метод безвреден: вернет false если state пуст, вернет false пути не поменялись и вернет true, толкьо
     *    если state не пуст и пути поменялись. Но если в сортирвоки вписать что-то типа: (prevSort !== nexSort && !isRouteChanged),
     *    то получится так: первая часть даст true при переходе, если тип сортировки меняли, так как придет иное значение, дефолтное,
     *    для сброса на исходные. Второе условие даст true, есл в него придет false. А false придет, так как state на определенном
     *    этапе будет временно пуст. Так мы попробуем соритрвоать пустой state и получим ошибку. Проще просто всего работать от непустого
     *    state.
     * 4. Получены доп. данные lazyLoad. Опять же, доп. данные могут быть получены только для уже загруженного компонента. Также
     *    проверяем, не пуст ли блок lazy из Redux и главное: разницу индексов. Изначально индексы равны: 0 тут в state и
     *    0 в Redux store. Но когда данные получены, индекс в Redux store меняется и прихоидт в виде props. Как результат - мы
     *    дополняем state данными, и устанавливаем новый index для state. Теперь в условие не попадем, пока не придет новый
     *    индекс.
     *
     */
    //endregion
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.isStateEmpty() && this.props.data) this.setState((state) => ({ products: this.props.data }));
        if (!this.isStateEmpty() && prevProps.sortType !== this.props.sortType) this.sortProducts();

        if (this.isRouteChanged()) {
            this.clearState();
            this.props.fetchCategoryPageData(this.props);
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
        this.props.fetchCategoryPageData(this.props);
    }

    componentWillUnmount() {
        this.clearState();// очистка state и redux-store при каждом размонтировании компонента
    }

    render() {
        if (this.props.error.recived) return <Redirect to={this.props.error.code}/>;
        if (this.isStateEmpty()) {
            const SpinnerModal = ModalWrapper(Spinner);
            return <SpinnerModal/>;
        }
        const { main: category, data: products } = this.state.products;
        return <CategoryProductsList category={category} products={products}/>;
    }
}

const mapStateToProps = (state) => categorySelectors.getCategoryData(state);
export default connect(mapStateToProps, categoryActions)(Category);
