import React from 'react';
import styles from './specification.module.scss';

const Specification = ({ specs }) => (
    <>
        <div className={styles.attributes}>
            <h2 className={styles.table_title}>Общие характеристики</h2>
            <table className={styles.table_data}>
                <tbody>
                    <tr>
                        <td>Тип</td>
                        <td>{specs.type}</td>
                    </tr>
                    <tr>
                        <td>Цвет</td>
                        <td>{specs.color}</td>
                    </tr>
                    <tr>
                        <td>Тип корпуса</td>
                        <td>{specs.casetype}</td>
                    </tr>
                    <tr>
                        <td>Материал корпуса</td>
                        <td>{specs.casematerial}</td>
                    </tr>
                    <tr>
                        <td>Тип SIM-карты</td>
                        <td>{specs.simtype}</td>
                    </tr>
                    <tr>
                        <td>Количество SIM-карт</td>
                        <td>{specs.simcount}</td>
                    </tr>
                    <tr>
                        <td>Вес</td>
                        <td>{specs.weight}</td>
                    </tr>
                    <tr>
                        <td>Размеры</td>
                        <td>{specs.size}</td>
                    </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Экран</h2>
            <table className={styles.table_data}>
                <tbody>
                    <tr>
                        <td>Тип экрана</td>
                        <td>{specs.screentype}</td>
                    </tr>
                    <tr>
                        <td>Диагональ</td>
                        <td>{specs.screensize}</td>
                    </tr>
                    <tr>
                        <td>Размер изображения</td>
                        <td>{specs.screenresolution}</td>
                    </tr>
                    <tr>
                        <td>Автоматический поворот экрана</td>
                        <td>{specs.screenrotate}</td>
                    </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Мультимедийные возможности</h2>
            <table className={styles.table_data}>
                <tbody>
                    <tr>
                        <td>Тыловая фотокамера</td>
                        <td>{specs.maincamera}</td>
                    </tr>
                    <tr>
                        <td>Фотовспышка</td>
                        <td>{specs.flashtype}</td>
                    </tr>
                    <tr>
                        <td>Функции тыловой фотокамеры</td>
                        <td>{specs.maincamerafunction}</td>
                    </tr>
                    <tr>
                        <td>Диафрагма тыловой фотокамеры</td>
                        <td>{specs.casetype}</td>
                    </tr>
                    <tr>
                        <td>Запись видео</td>
                        <td>{specs.recordingvideo}</td>
                    </tr>
                    <tr>
                        <td>Макс. частота кадров видео</td>
                        <td>{specs.maximumframerate}</td>
                    </tr>
                    <tr>
                        <td>Аудио</td>
                        <td>{specs.audiosupport}</td>
                    </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Связь</h2>
            <table className={styles.table_data}>
                <tbody>
                    <tr>
                        <td>Стандарт</td>
                        <td>{specs.connectionstandart}</td>
                    </tr>
                    <tr>
                        <td>Поддержка диапазонов LTE</td>
                        <td>{specs.lte}</td>
                    </tr>
                    <tr>
                        <td>Интерфейсы</td>
                        <td>{specs.interfaces}</td>
                    </tr>
                    <tr>
                        <td>Спутниковая навигация</td>
                        <td>{specs.satellite}</td>
                    </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Память и процессор</h2>
            <table className={styles.table_data}>
                <tbody>
                    <tr>
                        <td>Процессор</td>
                        <td>{specs.cpu}</td>
                    </tr>
                    <tr>
                        <td>Количество ядер процессора</td>
                        <td>{specs.cpucoresamount}</td>
                    </tr>
                    <tr>
                        <td>Видеопроцессор</td>
                        <td>{specs.videocpu}</td>
                    </tr>
                    <tr>
                        <td>Объем встроенной памяти</td>
                        <td>{specs.memory}</td>
                    </tr>
                    <tr>
                        <td>Объем оперативной памяти</td>
                        <td>{specs.ram}</td>
                    </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Питание</h2>
            <table className={styles.table_data}>
                <tbody>
                    <tr>
                        <td>Емкость аккумулятора</td>
                        <td>{specs.acc}</td>
                    </tr>
                    <tr>
                        <td>Тип аккумулятора</td>
                        <td>{specs.acctype}</td>
                    </tr>
                    <tr>
                        <td>Тип разъема для зарядки</td>
                        <td>{specs.connectortype}</td>
                    </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Дополнительная информация</h2>
            <table className={styles.table_data}>
                <tbody>
                    <tr>
                        <td>Комплектация</td>
                        <td>{specs.supplies}</td>
                    </tr>
                    <tr>
                        <td>Дата анонсирования</td>
                        <td>{specs.announcedate}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
);

export default Specification;
