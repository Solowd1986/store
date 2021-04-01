import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import CategoryProductsList from './CategoryProductsList/CategoryProductsList';
import Spinner from '@components/Partials/Spinner/Spinner';
import withModal from '@components/Helpers/Hoc/withModal/withModal';
import * as utils from '@components/Helpers/Functions/scrollbarHelper';

import { bindActionCreators } from 'redux';
import * as serverActions from '@redux/entities/server/actions';
import * as sortActions from '@redux/entities/sort/actions';
import * as serverSelectors from '@redux/entities/server/selectors/serverSelectors';
import * as sortSelectors from '@redux/entities/sort/selectors/sortSelectors';
import { connect } from 'react-redux';

import arrayShuffle from '@components/Helpers/Functions/arrayShuffle';
import createDeepCopyOfObject from '@components/Helpers/Lodash/lodashCloning';
import produce from 'immer';

//<editor-fold desc="Описание компонента">
/**
 * 1. Как только пришли, конструктор создает запрос и формирует начальный state
 * 2. В рендер стейт пуст, значит выводим спиннер.
 * 3. Данные пришли, рендер, стейт все еще пуст, но в DidUpdate меняет стейт
 *
 *
 * Тут выполняются три проверки:
 * 1. Первый рендер компонента: спиннер показывает пока стейт пуст, а потом показывается категория
 * 2. Второй рендер это получение свойств. Стейст уже есть.
 * Человек нажал на ссылку, пришли пропсы, перед првоеркой забрали алиас стейста, например phones
 * Сравниил: алисас стейста равен пропсам - нет, значит спиннер. А в дидапдейт вызвали запрос данных.
 * Данные пришли, сравниваем: алисас стейста все еще не равен пропсам. Потому что новые данные покатегории пришли
 * но еещ не записаны в стейст, опять спиннер. В дидапдейст ставим новый стейст и вызываем ре-рендер
 * Приходитм опять сюда: алиас стейста равен пропсам пути (пута) - проверка пройдена, отрисовываем категоирю
 */
//</editor-fold>
class Category extends Component {
    static propTypes = {
        clearCategoryPageReduxData: PropTypes.func,
        sortType: PropTypes.string,
        discardSortType: PropTypes.func,
        lastIndex: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.isSorted = false;
        this.state = {
            categoryProductsList: null,
            lastIndex: 0,
        };
    }

    // use private
    _isProductListStateEmpty = () => !this.state.categoryProductsList;
    _getCurrentCategoryAlias = () => this.state.categoryProductsList && this.state.categoryProductsList.main.alias;
    _isThisAnotherCategoryPage = () => this._getCurrentCategoryAlias() !== this.props.match.params.type;
    _clearComponentState = () => this.setState((state) => ({ categoryProductsList: null, lastIndex: 0 }));

    _sortProductsList = () => {
        let stateProductsCopy = createDeepCopyOfObject(this.state.categoryProductsList.data);
        switch (this.props.sortType) {
            case 'по популярности': {
                stateProductsCopy = arrayShuffle(stateProductsCopy);
                break;
            }
            case 'по возрастанию цены': {
                stateProductsCopy.sort((a, b) => a.price - b.price);
                break;
            }
            case 'по убыванию цены': {
                stateProductsCopy.sort((a, b) => b.price - a.price);
                break;
            }
            case 'по новинкам': {
                stateProductsCopy = arrayShuffle(stateProductsCopy);
                break;
            }
            case 'по скидкам': {
                stateProductsCopy = arrayShuffle(stateProductsCopy);
                break;
            }
            default: {
                return;
            }
        }
        this.setState(
            produce(this.state, (draft) => {
                draft['categoryProductsList'].data = stateProductsCopy;
            }),
        );
    };

    //<editor-fold desc="Вариации смены state">
    /**
     * Все сценарии подразумевают обновление уже размещенного компонента.
     * Начальный вызов componentDidUpdate - это получение данных категории после вызова fetchPageData.
     * 1. Если state компонента пуст и данные по категории получены - заполняем state.
     * 2. Если это другая страница категории и state уже содержит данные, то очищаем state компонента и очищаем state redux
     *    потом запрашиваем данные по новой категории. Сброс двух stat-ов вызовет re-render, но данных по fetch пока нет,
     *    будет показан спиннер. Потом данные придут и выполнится первое условие - state пуст и данные категории получены.
     *    Кстати, проверка на новую категорию такая: если state не пуст, то есть компонент один раз уже был загружен с данными
     *    по какой-то категории и если название категории из текущего state не совпадает с match - то это новая категория.
     * 3. Далее блок LazyLoad. Если state не пуст и пришедший в props индекс последнего загруженного lazy-элемента не равен
     *    тому, что записан в state - значит получены новые данные, меняем state.
     * 4. Далее сортировка. Тип сортировки приходит из redux-store, сравнивается то, что пришло в прошлых props и в текущих,
     *    если они не совпадают, значит их сменил пользователь - вызываем сортировку и меняем state. Также ставим флаг isSorted
     * 5. Прокрутка окна вниз. Если lastIndex больше 0, то есть lazyLoad был использован, и если текущий lastIndex в state
     *    равен тому, что получен в props - значит, state уже синхронизирован с данными из lazyLoad и они отображены. Значит
     *    можно прокрутить окно вниз.
     * 6. Проблема с прокруткой такая: она выполняется, если lastIndex менялся и lastIndex redux и state синхронизиорваны.
     *    Сложность в том, что вызов сортировки провоцирует re-render, а значит componentDidUpdate, а значит прокрутку,
     *    так как условия тут все еще выполняются. Решение: использования флага isSorted, изначально он false и не мешает
     *    прокрутке. Но, как только выполнятся сортировка сценарий такой:
     *    - вызов сортировки из componentDidUpdate
     *    - флаг isSorted ставится в true
     *    - в условие прокрутки мы уже не попадаем
     *    - условие ниже ставит флаг isSorted в false, но типы сортировок в prevProps и в props все еще разные, пропускаем
     *    - метод сортировки вызывает setState, выполняется render, порядок товаров меняется
     *    - опять переходим к componentDidUpdate, в блок сортировки не попадаем, так как в prevProps и в props уже один тип sort.
     *    - в блок прокрутки тоже не попадаем, так как isSorted флаг все еще true
     *    - но сейчас в prevProps и в props уже один тип сортировки, значит, isSorted ставится в false
     *    - теперь прокрутка будет работать до следущей сортировки
     */
    //</editor-fold>
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this._isProductListStateEmpty() && this.props.category) {
            this.setState((state) => ({ categoryProductsList: this.props.category }));
        }
        if (this._isThisAnotherCategoryPage() && !this._isProductListStateEmpty()) {
            this._clearComponentState();
            this.props.clearCategoryPageReduxData();
            this.props.discardSortType();
            this.props.fetchPageData(this.props);
        }
        if (!this._isProductListStateEmpty() && this.state.lastIndex !== this.props.lastIndex) {
            this.setState(
                produce(this.state, (draft) => {
                    draft['lastIndex'] = this.props.lastIndex;
                    draft['categoryProductsList']['main'] = this.state.categoryProductsList.main;
                    draft['categoryProductsList']['data'] = [...this.state.categoryProductsList.data, ...this.props.lazy];
                }),
            );
        }
        if (prevProps.sortType !== this.props.sortType && !this._isThisAnotherCategoryPage()) {
            this._sortProductsList();
            this.isSorted = true;
        }

        if ((this.props.lastIndex > 0 || this.props.lastIndex === -1) && !this._isThisAnotherCategoryPage() && !this.isSorted && this.state.lastIndex === this.props.lastIndex) {
            utils.scrollToBottom();
        }
        if (prevProps.sortType === this.props.sortType) this.isSorted = false;
    }

    componentDidMount() {
        this.props.fetchPageData(this.props);
    }

    componentWillUnmount() {
        this.props.clearCategoryPageReduxData(); // очистка redux-state при каждом размонтировании компонента
    }

    render() {
        if (this._isProductListStateEmpty() || this._isThisAnotherCategoryPage()) {
            const SpinnerModal = withModal(Spinner, {
                bg: false,
                interactionsDisabled: true,
            });
            return <SpinnerModal />;
        } else {
            const { main: category, data: products } = this.state.categoryProductsList;
            return <CategoryProductsList category={category} products={products} />;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        category: serverSelectors.serverCategorySelector(state),
        lazy: serverSelectors.serverLazySelector(state),
        lastIndex: serverSelectors.serverLastIndexSelector(state),
        sortType: sortSelectors.sortTypeSelector(state),
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...serverActions, ...sortActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Category);
