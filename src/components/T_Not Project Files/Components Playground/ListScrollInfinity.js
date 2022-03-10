import React, { useEffect, useState } from "react";
import styles from "./scss/styles.module.scss";
import cn from "classnames";
import axios from "axios";
import { nanoid } from "nanoid";


/**
 * listOfItems - список элементов, выводимых на странице
 *
 * cntOfAddedItemBlocks - количество блоков выведенных элементов, например, при itemsPerPage = 5, каждый блок включает 5 элементов.
 * В основе этого запрос к mockapi, который позволяет получить набор элементов для разных страниц, только в нашем случае страницы не
 * используются, просто при нажатии на кнопку "Добавить Элементы" подгружаются новые. Суть работы механизма в том, что mockapi
 * на своей стороне просто создает offset при доступе к ББ, и возвращает элементы после этого отступа,
 * например, отправили page=2&limit=5, расчет будет наподобие 2 - 1 * 5 = 5, то есть отступи на 5 элементов и верни следующие 5
 *
 * itemsPerPage - количество элементов на странице/в блоке
 *
 * ID_UNIQUE - уникальное имя поля, которое добвляется к каждому полученному обьекту, для вывода массива с полем key в JSX
 */

const ScrollListInfinity =  () => {

    const [listOfItems, setListOfItems] = useState([]);
    const [cntOfAddedItemBlocks, setCntAddedItemBlocks] = useState(1);
    const itemsPerPage = 5;
    const ID_UNIQUE = "id_unique";

    /**
     *     Возвращает массив из обьектов, каждый из которых получил новое поле id_unique
     */
    const generateId = (listOfItems) => listOfItems.map(item => ({[ID_UNIQUE]: nanoid(), ...item}));
    /**
     * Увеличиваем счетчик смещений блоков выводимых элементов
     */
    const addItems = () => setCntAddedItemBlocks(cntOfAddedItemBlocks => ++cntOfAddedItemBlocks);

    /**
     * Возвращаем массив, в который расширен массив state, который через операцию concat объединен с пришедшим доп. массивом от сервера
     * Каждый массив проходит через generateId, чтобы иметь уникальные ключи при выводе в JSX
     */
    useEffect(() => {
        axios.get(`https://6224b26a6c0e3966204475cd.mockapi.io/users?page=${cntOfAddedItemBlocks}&limit=${itemsPerPage}`).then(response => {
            setListOfItems(state => ([...state.concat(...generateId(response.data))]));
        });
    }, [cntOfAddedItemBlocks]);

    return (
        <div className={styles.wrp}>
            <div className={styles.innerPadding}>List:</div>
            <ul className={styles.innerPadding}>
                {listOfItems && (listOfItems.map(item => <li key={item[ID_UNIQUE]} className={styles.user_info}>{`${item.id} ${item.name}`}</li>))}
            </ul>
            <div className={styles.innerPadding}>
                <button className={styles.btn_add} onClick={addItems}>Add More</button>
            </div>
        </div>
    )
};

export default ScrollListInfinity;
