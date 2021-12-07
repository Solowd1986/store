import React, { useEffect, useState } from "react";
import { IProductTypes, ReduxState } from "@root/ts/types/_core";
import { ICategoryProps, ICategoryState, ICategoryTypes, IDraft, IReduxCategoryProps } from "@root/ts/types/category";

import { usePreviousProps } from "@components/Helpers/Hooks/PreviousProps/PreviousProps";
import arrayShuffle from "@components/Helpers/Functions/arrayShuffle";
import produce from "immer";

import CategoryProductsList from "./CategoryProductsList/CategoryProductsList";
import Spinner from "@components/Partials/Spinner/Spinner";
import ModalWrapper from "@components/Helpers/Hooks/ModalWrapper/ModalWrapper";
import { Redirect } from "react-router-dom";

import * as categoryActions from "@redux/entities/category/actions";
import * as categorySelectors from "@redux/entities/category/selectors/categorySelectors";
import { connect } from "react-redux";


//region Описание
/**
 * Получаемые props:
 * 1.data - содержит два поля: main и data. Первое - это общие данные по категории, второе - массив товаров
 * 2.lastIndex - индекс последнего элемента, добаленного через lazyload
 * 3.sortType - тип сортировки
 * 4.lazy - данные lazyload, подгружаемые дополнительно. По-умолчанию приходят со значением null
 * 5.match - поле от Роутера, в нем приходит путь по которому был переход, например, новая категория телефоны/гаджеты/etc
 * 6.error - ошибка, при получении выполняется редирект на страницу ошибки
 * 7.clearCategoryReduxState - метод для очистки redux state
 * 8.fetchCategoryPageData - метод для запроса данных на сервер
 *
 * Принцип работы блока useEffect (при полчкнии props)
 *
 * 1. State компонента пуст (то есть это первый вход в блок категорий). Тогда просто при получении props - вписываем данные.
 * 2. Смена типа сортировки. По умолчанию тип сортировки приходит из Redux (иницилизирующее значение) Если state не пуст,
 *    и тип сортировки пришедший в props отличается - то меняем порядок элементов в текущем state. Проверка на пустоту state нужна,
 *    так как при переходе между категориями тип сортировки сбрасывает на стандартный). Это ведет к вызове метода сортировки, но
 *    также при переходе между категориями сбрасывается state, а значит, воообще нет данных для сортировки. Потому и нужна проверка.

 * 3. Смена route-пути между разными категориями. Это происходит лишь в рамках уже загруженного компонента Category,
 *    значит, state должен быть не пуст.
 *   В этом случае проверяем alias текущей категории и поле match из props, если они разные - были переходы в рамках компонента.
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
 * @param props
 * @constructor
 */
    //endregion
const Category = (props: ICategoryProps): JSX.Element => {
    const { data, lastIndex, sortType, lazy, match, error, clearCategoryReduxState, fetchCategoryPageData } = props;
    const [state, setState] = useState<ICategoryState>({ products: null, lastIndex: 0 });
    const prevPropsSortType: string | undefined = usePreviousProps(props.sortType);


    const isStateEmpty = (): boolean => !state.products;
    const clearState = (): void => {
        setState(() => ({ products: null, lastIndex: 0 }));
        clearCategoryReduxState();
    };

    const isRouteChanged = (): boolean => !isStateEmpty() ? state.products?.main.alias !== match.params.type : false;
    const isLazyLoadRecived = (): boolean | IProductTypes[] => !isStateEmpty() && (state.lastIndex !== lastIndex) && lazy;

    const sortProducts = (): void => {
        if (!state.products?.data) return;
        let productsList = [...state.products.data];

        switch (sortType) {
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
        setState(
            produce(state, (draft: IDraft) => {
                draft["products"].data = productsList;
            }),
        );
    };

    useEffect(() => {
        if (isStateEmpty() && data) setState((state) => ({ products: data, lastIndex: state.lastIndex }));
        if (!isStateEmpty() && prevPropsSortType !== sortType) sortProducts();

        if (isRouteChanged()) {
            clearState();
            fetchCategoryPageData(props);
        }

        if (isLazyLoadRecived()) {
            setState(
                produce(state, (draft: IDraft) => {
                    draft["lastIndex"] = lastIndex;
                    draft["products"]["main"] = state.products?.main;
                    draft["products"]["data"] = state.products ? [...state.products.data, ...lazy,] : {};
                }),
            );
        }
    }, [props]);


    useEffect(() => {
        fetchCategoryPageData(props);
        return ():void => clearState() // очистка state и redux-store при каждом размонтировании компонента
    }, []);


    if (error.recived) return <Redirect to={error.code}/>;
    if (isStateEmpty()) {
        const SpinnerModal = ModalWrapper(Spinner);
        return <SpinnerModal/>;
    }

    const { main: category, data: products } = state.products as ICategoryTypes;
    return <CategoryProductsList category={category} products={products}/>;
};


const mapStateToProps = (state: ReduxState): IReduxCategoryProps => categorySelectors.getCategoryData(state);
export default connect(mapStateToProps, categoryActions)(Category);
