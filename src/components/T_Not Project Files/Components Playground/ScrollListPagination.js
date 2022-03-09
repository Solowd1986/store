import React, { useEffect, useState } from "react";
import styles from "./scss/styles.module.scss";
import cn from "classnames";
import axios from "axios";
import { nanoid } from "nanoid";

const ScrollListPagination = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);

    const itemsPerPage = 5;
    // Формируя offset мы создаем отступ для запроса БД, он не включает элементы, которые нужны.
    // Например, мы вывели 4 страницы по 5 элементов, всего 20, жмем на страницу 5, считаем = (5 - 1) * 5 = 20.
    // Отдаем это БД, запрос пропустит 20 записей и отдаст 5 записей после них.
    // Второй способ - отдавать страницу и количество записей. Например, site.ru/page=2&items=5.
    // Принцип расчета тот же, просто считается на сервере.
    const getOffset = () => page > 1 ? ((page - 1) * itemsPerPage) : 1;

    const generateId = (data) => data.map(item => ({id_unique: nanoid(), ...item}));

    //console.log(getOffset());

    useEffect(() => {
        axios.get(`https://6224b26a6c0e3966204475cd.mockapi.io/users?page=${page}&limit=${itemsPerPage}`).then(response => {
            setData(generateId(response.data));
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
                {data && (data.map(item => <li key={item.id_unique} className={styles.user_info}>{`${item.id} ${item.name}`}</li>))}
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



