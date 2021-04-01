import React, { PureComponent } from 'react';
import styles from './sort-products.module.scss';
import cn from 'classnames';
import * as sort from '@redux/entities/sort/actions';
import * as sortSelectors from '@redux/entities/sort/selectors/sortSelectors';
import { connect } from 'react-redux';

class SortPorducts extends PureComponent {
    constructor(props) {
        super(props);
        this.list = React.createRef();
        this.state = {
            showSortPanel: false,
        };
    }

    /**
     * Запрещаем всплытие при клике на кнопку открытия панели или на элемент выбора типа сортироваки, чтобы ониэ
     * не провоцировали срабатывание обработчика клика по window, иначе каждый клик по ним вызывал бы закрытие
     * панели выбор типа сортировки: клик по кнопке -> showSortPanel: true -> перехват клика на всплытие до window
     * -> вызов controlSortPanel, проверка на true продена -> скрытие панели.
     */
    toggleSortPanel = (evt) => {
        evt.stopPropagation();
        if (!this.state.showSortPanel) {
            Array.from(this.list.current.children).forEach((item) => item.classList.remove(styles.active));
            Array.from(this.list.current.children)
                .find((item) => item.innerText === this.props.sortType)
                .classList.add(styles.active);
        }
        this.setState((state) => {
            return {
                showSortPanel: !this.state.showSortPanel,
            };
        });
    };

    changeSortType = (evt) => {
        evt.stopPropagation();
        if (evt.target.nodeName === 'LI' && evt.target.innerText !== this.props.sortType) {
            this.props.changeSortType(evt.target.innerText);
            this.setState((state) => {
                return {
                    showSortPanel: false,
                };
            });
        }
    };

    closeSortPanelOnClickByWindow = () => {
        this.setState((state) => {
            if (state.showSortPanel === true)
                return {
                    showSortPanel: false,
                };
        });
    };

    componentDidMount() {
        window.addEventListener('click', this.closeSortPanelOnClickByWindow);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.closeSortPanelOnClickByWindow);
    }

    render() {
        const classList = cn(styles.sort_list_panel, 'animate__animated animate__fadeInUp animate__faster', {
            [styles.panel_show]: this.state.showSortPanel === true,
            [styles.panel_hide]: this.state.showSortPanel === false,
        });
        return (
            <>
                <div className={styles.sort_wrapper}>
                    <span className={styles.sort_title}>Сортировать: </span>
                    <span className={styles.sort_type} onClick={this.toggleSortPanel}>
                        {this.props.sortType}
                        <svg width={'9px'} height={'9px'} className={styles.sort_icon} viewBox="0 0 451.847 451.847">
                            <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
                        </svg>
                    </span>
                    <ul className={classList} onClick={this.changeSortType} ref={this.list}>
                        <li>по новинкам</li>
                        <li>по популярности</li>
                        <li>по возрастанию цены</li>
                        <li>по убыванию цены</li>
                        <li>по скидкам</li>
                    </ul>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sortType: sortSelectors.sortTypeSelector(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSortType: (sortType) => {
            dispatch(sort.changeSortType(sortType));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortPorducts);
