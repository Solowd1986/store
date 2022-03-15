import React, { useEffect, useState } from "react";
import styles from "./scss/styles.module.scss";
import cn from "classnames";
import axios from "axios";
import { nanoid } from "nanoid";

/**
 *
 * listOfItems - список элементов, выводимых на странице
 *
 * changePage - метод получет номер страницы, по которой кликнул пользователь, переводит его в число. Если страница не новая, то ничего не
 * делаем. Если же новая - меняем state для page на новый номер.
 *
 * На изменение page завязан useEffect. При первой отрисовке компонента эффект в любом случае выполнится, происходит запрос к сервру,
 * отдаем page (изначально она равна 1) и itemsPerPage, у нас это 5. Так мы получаем начальный набор элементов для первой страницы.
 * При последующих сменах page эффект будет срабатывать снова, получая данные для нужных страниц.
 *
 * itemsPerPage - количество элементов на странице/в блоке
 *
 * ID_UNIQUE - уникальное имя поля, которое добвляется к каждому полученному обьекту, для вывода массива с полем key в JSX
 *
 * getOffset - метод для получения отступа для запроса к БД. В случае использования mockapi это не нужно, но сам принцип такой:
 * 1. Берем номер страницы. Если это 1, то отступ 0, при запрос к БД получим первые 5 элементов.
 * 2. Номер страницы теперь 2, значит считаем как 2 - 1 * 5 = 5, это отступ для БД: пропусти 5 элемнтов и верни 5.
 * 3. Номер страницы теперь 3, значит считаем как 3 - 1 * 5 = 10, это отступ для БД: пропусти 10 элемнтов и верни 5.
 * 4. И так далее.
 *
 */
const ScrollListPagination = () => {
    const [page, setPage] = useState(1);
    const [listOfItems, setListOfItems] = useState([]);
    const itemsPerPage = 5;
    const ID_UNIQUE = "id_unique";


    const getOffset = () => page > 1 ? ((page - 1) * itemsPerPage) : 0;
    /**
     *     Возвращает массив из обьектов, каждый из которых получил новое поле id_unique
     */
    const generateId = (data) => data.map(item => ({[ID_UNIQUE]: nanoid(), ...item}));

    useEffect(() => {
        axios.get(`https://6224b26a6c0e3966204475cd.mockapi.io/users?page=${page}&limit=${itemsPerPage}`).then(response => {
            setListOfItems(generateId(response.data));
        });
    }, [page]);

    const changePage = async (evt) => {
        const currentPage = parseInt(evt.currentTarget.innerText);
        if (page === currentPage) return;
        setPage(state => currentPage);
    };

    return (
        <div className={styles.wrp}>
            <div className={styles.innerPadding}>List:</div>
            <ul className={styles.innerPadding}>
                {listOfItems && (listOfItems.map(item => <li key={item[ID_UNIQUE]} className={styles.user_info}>{`${item.id} ${item.name}`}</li>))}
            </ul>
            <ul>
                <li>
                    <button className={cn(styles.innerPadding, styles.btn_change_page)} onClick={changePage}>1</button>
                    <button className={cn(styles.innerPadding, styles.btn_change_page)} onClick={changePage}>2</button>
                    <button className={cn(styles.innerPadding, styles.btn_change_page)} onClick={changePage}>3</button>
                    <button className={cn(styles.innerPadding, styles.btn_change_page)} onClick={changePage}>4</button>
                    <button className={cn(styles.innerPadding, styles.btn_change_page)} onClick={changePage}>5</button>
                </li>
            </ul>
        </div>
    )
};

export default ScrollListPagination;



