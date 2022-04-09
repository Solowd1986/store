import React, { createRef, useEffect, useRef, useState } from "react";
import styles from "./scss/styles.module.scss";
import cn from "classnames";
import axios from "axios";
import { nanoid } from "nanoid";


import { useInView } from 'react-intersection-observer';



// Хук определения направления скролла, возвращает true, если направление "вниз"
const useGetScrollDirection = () => {
    const [isDirectionGoDown, setDirection] = useState(null);
    useEffect(() => {
        const getDirection = (evt) => evt.wheelDelta > 0 ? setDirection(false) : setDirection(true);
        window.addEventListener("wheel", getDirection);
        return () => {
            window.removeEventListener("wheel", getDirection);
        }
    },[]);
    return [
        isDirectionGoDown
    ]
};





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

    // Блок, который служит точкой, при достижении которой считается, что пора начинать подгрузку элементов.
    // Создаем элемент под(!) блоком вывода и как только он входит во view или через rootMargin чуть ранее,
    // мы начинем подргужать элементы
    const bottom = useRef(null);
    // Так мы определяем, направлен ли скролл вниз
    const [isDirectionGoDown] = useGetScrollDirection();

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

    // Набор элементов для вывода
    const [listOfItems, setListOfItems] = useState([]);
    // Количество добавленных подгрузкой блоков
    const [cntOfAddedItemBlocks, setCntAddedItemBlocks] = useState(1);
    // Установка статуса загрузки элементов
    const [loading, setLoading] = useState(false);
    // Настройка компонента отвечающего за срабатывание события по достижению нужной точки экрана
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });

    // Если элемент не в inView, то есть пока невидим, если loading равно true, то есть идет загрузка и если скролл направлен
    // не вниз, то выходим из эффекта и ничего не делаем. Иначе ставим loading в true и стартуем асинхронный запрос.
    // Когда рзультат получен - ставим loading в false, загружаем данные в state и переводим cntOfAddedItemBlocks на
    // единицу в плюс. Кстати, как работает setCntAddedItemBlocks:
    // 1. Начальное значение 1, это потому, что эффект сработает первый раз при монтировании компонента.
    // 2. Отправим на uri количество блоков, сейчас это 1, и лимит - это 5. Вернется 1 блок из 5 элементов
    // 3. Дальше это количество будет увеличиваться на 1, и будут приходить новые данные.
    // 4. В целом, в данном конкретном случае мы отправлеяем запрос на mockapi.io, ему нужен просто номер страницы
    //    и количество элементов, то есть у него в принципе номерная-постраничная пагинация. У меня же тут бесконечная,
    //    но принцип один, просто блок, который по идее принадлежит некой странице дописывается в текущий список элементов
    //    и так оно дополняется по мере прокрутки. Чтобы было удобнее отличать, я и назвал это setCntAddedItemBlocks. То есть
    //    как бы блоки добавленные в текущий контейнер элементов.
    useEffect(() => {
        if (!inView || loading || !isDirectionGoDown) return;
        setLoading(true);
        const uri = `https://6224b26a6c0e3966204475cd.mockapi.io/users?page=${cntOfAddedItemBlocks}&limit=${itemsPerPage}`;

        (async () => {
            const { data } = await axios.get(uri);
            setListOfItems(state => ([...state.concat(...generateId(data))]));
            setCntAddedItemBlocks(cntOfAddedItemBlocks => ++cntOfAddedItemBlocks);
            setLoading(false);
        })();

        return () => {

        }
    }, [inView]);

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
