import React, { Component } from 'react';

class Search extends Component {
    /**
     * Логика работы: внизу подключается компонент вывода найденного, подписываетсян на свойство хранящее данные, типа matches
     *
     * Если данных нет - компонент ничего не выводит.
     * Пришел запрос, оправляем из метода типа апдейт запрос на сервер. Получаем овтет, меняем свойство стейт
     * Компонент видит что своство есть и выводит данные. То есть это под окном поиска примоуголник со списком полученных
     * записей может быть выведен
     *
     * Также можно все это реализовать через редакс, но это все же локальные данные.
     * @type {{value: string}}
     */
    state = { value: '' };

    handleChange = (evt) => {
        this.setState((state) => ({ value: evt.target.value }));
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.findSomething(this.state.value);
    };

    render() {
        return (
            <form name={'search-form'} method={'POST'}>
                <label htmlFor="search" />
                <input onChange={this.handleChange} id={'search'} type={'input'} name={'search-field'} placeholder={'Find something...'} />
                <input onSubmit={this.handleSubmit} type={'submit'} name={'search-submit'} value={'Find it!'} />
            </form>
        );
    }
}

export default Search;
