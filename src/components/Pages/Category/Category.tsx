import React, { useCallback, useEffect, useState } from "react";
import { IProductTypes, ReduxState } from "@root/types/_core";
import { ICategoryProps, ICategoryState, ICategoryTypes, IDraft, IReduxCategoryProps } from "@root/types/category";

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
 * Принцип работы блока useEffect (при получении props с данными по категории)
 *
 * 1. State компонента пуст (то есть это первый вход в блок категорий). Тогда просто при получении props - вписываем данные.
 * 2. Смена типа сортировки. По умолчанию тип сортировки приходит из Redux (иницилизирующее значение) Если state не пуст,
 *    и тип сортировки пришедший в props отличается - то меняем порядок элементов в текущем state. Проверка на пустоту
 *    state нужна, так как при переходе между категориями тип сортировки сбрасывается на стандартный, это ведет
 *    к вызову метода сортировки, но также при переходе между категориями сбрасывается state products на null, а значит,
 *    воообще нет данных для сортировки. Потому и нужна проверка, иначе будут ошибки при попытке сортировать null

 * 3. Смена route-пути между разными категориями. Это происходит лишь в рамках уже загруженного компонента Category,
 *    значит условие: state должен быть не пуст.
 *    В этом случае проверяем alias текущей категории и поле match из props, если они разные - были переходы в рамках компонента.
 *    Может возникнуть вопрос: отчего не использовать и для определения сортировки метод isRouteChanged? Проблема в том, что
 *    в рамках очистки данных, метод безвреден: вернет false если state пуст, вернет false если пути не поменялись и вернет true,
 *    только если state не пуст и пути поменялись. Но если вписать что-то типа: (prevSort !== nexSort && !isRouteChanged),
 *    то получится так: первая часть даст true при переходе, если тип сортировки меняли, так как придет иное значение, дефолтное,
 *    для сброса на исходные. Второе условие даст true, есл в него придет false. А false придет, так как state на определенном
 *    этапе будет временно пуст. Так мы попробуем сорировать пустой state и получим ошибку. Проще просто всего работать от непустого
 *    state.
 * 4. Получены доп. данные lazyLoad. Опять же, доп. данные могут быть получены только для уже загруженного компонента. Также
 *    проверяем, не пуст ли блок lazy из Redux и главное: разницу индексов. Изначально индексы равны: 0 тут в state и
 *    0 в Redux store. Но когда данные получены, индекс в Redux store меняется и приходдт в виде props. Как результат - мы
 *    дополняем state данными, и устанавливаем новый index для state. Теперь в условие не попадем, пока не придет новый
 *    индекс.
 * @param props
 * @constructor
 */
    //endregion
const Category = (props: ICategoryProps): JSX.Element => {
    const { data, lastIndex, sortType, lazy, match, error,
        clearCategoryReduxState,
        fetchCategoryPageData,
        match: { params, path}
    } = props;

    const [state, setState] = useState<ICategoryState>({ products: null, lastIndex: 0 });
    const prevPropsSortType: string | undefined = usePreviousProps(props.sortType);

    const isStateEmpty = useCallback((): boolean => !state.products, [state.products]) ;

    const clearState = useCallback((): void => {
        setState(() => ({ products: null, lastIndex: 0 }));
        clearCategoryReduxState();
    }, [clearCategoryReduxState]);


    const isRouteChanged = (): boolean => !isStateEmpty() ? state.products?.main.alias !== match.params.type : false;

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
        if (!isStateEmpty() && prevPropsSortType !== sortType) sortProducts();
        if (isRouteChanged()) {
            clearState();
            fetchCategoryPageData(path, params);
        }
    });


    useEffect(() => {
        if (isStateEmpty() && data) setState((state) => ({ products: data, lastIndex: state.lastIndex }));
    }, [isStateEmpty, data]);


    useEffect(() => {
        const isLazyLoadRecived = (): boolean | IProductTypes[] => !isStateEmpty() && (state.lastIndex !== lastIndex) && lazy;

        if (isLazyLoadRecived()) {
            setState(
                produce(state, (draft: IDraft) => {
                    draft["lastIndex"] = lastIndex;
                    draft["products"]["main"] = state.products?.main;
                    draft["products"]["data"] = state.products ? [...state.products.data, ...lazy,] : null;
                }),
            );
        }
    }, [state, lazy, lastIndex, isStateEmpty]);


    useEffect(() => {
        fetchCategoryPageData(path, params);
        return ():void => clearState() // очистка state и redux-store при каждом размонтировании компонента
    }, [path, params, fetchCategoryPageData, clearState]);


    /**
     * Два блока ниже - useEffect и if (error.recived) работают вместе и их порядок важен, так как есть return, а код
     * должен быть достижим. Итак, проблема в редиректе в том, что для каждой страницы, которая обращается к серверу
     * есть переход на страницу 500, если сервер не ответил, и статус этой ошибки хранится в Redux. Если его не сбросить,
     * то каждый переход на такую страницу будет провоцировать редирект.
     * Поэтому, если ошибка получена, мы сначала вызываем соответствующий метод сброса для Redux полей ошибки
     * такой страницы, а уже потом выполняем редирект.
     * */
    useEffect(() => {
        if (error.recived) {
            clearCategoryReduxState();
        }
    }, [clearCategoryReduxState, error.recived]);
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
