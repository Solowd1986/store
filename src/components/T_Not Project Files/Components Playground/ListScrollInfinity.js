import React, { createRef, useEffect, useRef, useState } from "react";
import styles from "./scss/styles.module.scss";
import cn from "classnames";
import axios from "axios";
import { nanoid } from "nanoid";


import { useInView } from 'react-intersection-observer';



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


    const bottom = useRef(null);

    const [listOfItems, setListOfItems] = useState([]);
    const [cntOfAddedItemBlocks, setCntAddedItemBlocks] = useState(1);


    if (bottom.current) {
        //console.log(bottom.current);
    }


    const [loading, setLoading] = useState(false);

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });


    // Создаем элемент под(!) блоком вывода и как только он входит во view или через rootMargin чуть ранее,
    // мы начинем подргужать элементы

    useEffect(() => {
        if (!inView || loading) return;

        console.log('in');
        setLoading(true);
        const uri = `https://6224b26a6c0e3966204475cd.mockapi.io/users?page=${cntOfAddedItemBlocks}&limit=${itemsPerPage}`;

        (async () => {
            const { data } = await axios.get(uri);
            console.log(data);

            setListOfItems(state => ([...state.concat(...generateId(data))]));
            setCntAddedItemBlocks(cntOfAddedItemBlocks => ++cntOfAddedItemBlocks);
            setLoading(false);
        })();

        return () => {
            console.log('not');
        }
    }, [inView]);



    // useEffect(() => {
    //
    //     const obs = new IntersectionObserver((entries, observer) => {
    //         console.log('----');
    //         console.log(entries);
    //         console.log(observer);
    //         console.log('----');
    //     }, {
    //         delay: 10000
    //
    //     });
    //     if (bottom.current) {
    //         obs.observe(bottom.current);
    //     }
    //     return () => {
    //         if (bottom.current) {
    //             obs.unobserve(bottom.current);
    //         }
    //     }
    // }, []);


    const [cursor, setCursor] = useState(false);

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
    // useEffect(() => {
    //     (async () => {
    //         const { data } = await axios.get(`https://6224b26a6c0e3966204475cd.mockapi.io/users?page=${cntOfAddedItemBlocks}&limit=${itemsPerPage}`);
    //         setListOfItems(state => ([...state.concat(...generateId(data))]));
    //     })();
    // }, [cntOfAddedItemBlocks]);





    return (
        <div className={styles.wrp}>

            <div style={{minHeight: "1000px"}}>glob</div>


            <div className={styles.innerPadding}>List:</div>
            <ul className={styles.innerPadding}>
                {listOfItems
                &&
                (listOfItems.map(item => <li key={item[ID_UNIQUE]} className={styles.user_info}>{`${item.id} ${item.name}`}</li>))}
            </ul>

            <div ref={ref} style={{minHeight: "100px", border: "10px solid red"}}>glob</div>

            <div className={styles.innerPadding}>
                <button className={styles.btn_add} onClick={addItems}>Add More</button>
                <button className={styles.btn_add} onClick={() => setCursor(state => state[state.length - 1]["title"])}>Add Less</button>
            </div>

        </div>
    )
};

export default ScrollListInfinity;
