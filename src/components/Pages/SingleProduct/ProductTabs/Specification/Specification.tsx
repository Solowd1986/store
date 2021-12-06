import React from "react";
import styles from "./specification.module.scss";

const Specification = ({ specifications }: { specifications: { [key: string]: (string | number) } }): JSX.Element => (
    <>
        <div className={styles.attributes}>
            <h2 className={styles.table_title}>Общие характеристики</h2>
            <table className={styles.table_data}>
                <tbody>
                <tr>
                    <td>Тип</td>
                    <td>{specifications.type}</td>
                </tr>
                <tr>
                    <td>Цвет</td>
                    <td>{specifications.color}</td>
                </tr>
                <tr>
                    <td>Тип корпуса</td>
                    <td>{specifications.casetype}</td>
                </tr>
                <tr>
                    <td>Материал корпуса</td>
                    <td>{specifications.casematerial}</td>
                </tr>
                <tr>
                    <td>Тип SIM-карты</td>
                    <td>{specifications.simtype}</td>
                </tr>
                <tr>
                    <td>Количество SIM-карт</td>
                    <td>{specifications.simcount}</td>
                </tr>
                <tr>
                    <td>Вес</td>
                    <td>{specifications.weight}</td>
                </tr>
                <tr>
                    <td>Размеры</td>
                    <td>{specifications.size}</td>
                </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Экран</h2>
            <table className={styles.table_data}>
                <tbody>
                <tr>
                    <td>Тип экрана</td>
                    <td>{specifications.screentype}</td>
                </tr>
                <tr>
                    <td>Диагональ</td>
                    <td>{specifications.screensize}</td>
                </tr>
                <tr>
                    <td>Размер изображения</td>
                    <td>{specifications.screenresolution}</td>
                </tr>
                <tr>
                    <td>Автоматический поворот экрана</td>
                    <td>{specifications.screenrotate}</td>
                </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Мультимедийные возможности</h2>
            <table className={styles.table_data}>
                <tbody>
                <tr>
                    <td>Тыловая фотокамера</td>
                    <td>{specifications.maincamera}</td>
                </tr>
                <tr>
                    <td>Фотовспышка</td>
                    <td>{specifications.flashtype}</td>
                </tr>
                <tr>
                    <td>Функции тыловой фотокамеры</td>
                    <td>{specifications.maincamerafunction}</td>
                </tr>
                <tr>
                    <td>Диафрагма тыловой фотокамеры</td>
                    <td>{specifications.casetype}</td>
                </tr>
                <tr>
                    <td>Запись видео</td>
                    <td>{specifications.recordingvideo}</td>
                </tr>
                <tr>
                    <td>Макс. частота кадров видео</td>
                    <td>{specifications.maximumframerate}</td>
                </tr>
                <tr>
                    <td>Аудио</td>
                    <td>{specifications.audiosupport}</td>
                </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Связь</h2>
            <table className={styles.table_data}>
                <tbody>
                <tr>
                    <td>Стандарт</td>
                    <td>{specifications.connectionstandart}</td>
                </tr>
                <tr>
                    <td>Поддержка диапазонов LTE</td>
                    <td>{specifications.lte}</td>
                </tr>
                <tr>
                    <td>Интерфейсы</td>
                    <td>{specifications.interfaces}</td>
                </tr>
                <tr>
                    <td>Спутниковая навигация</td>
                    <td>{specifications.satellite}</td>
                </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Память и процессор</h2>
            <table className={styles.table_data}>
                <tbody>
                <tr>
                    <td>Процессор</td>
                    <td>{specifications.cpu}</td>
                </tr>
                <tr>
                    <td>Количество ядер процессора</td>
                    <td>{specifications.cpucoresamount}</td>
                </tr>
                <tr>
                    <td>Видеопроцессор</td>
                    <td>{specifications.videocpu}</td>
                </tr>
                <tr>
                    <td>Объем встроенной памяти</td>
                    <td>{specifications.memory}</td>
                </tr>
                <tr>
                    <td>Объем оперативной памяти</td>
                    <td>{specifications.ram}</td>
                </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Питание</h2>
            <table className={styles.table_data}>
                <tbody>
                <tr>
                    <td>Емкость аккумулятора</td>
                    <td>{specifications.acc}</td>
                </tr>
                <tr>
                    <td>Тип аккумулятора</td>
                    <td>{specifications.acctype}</td>
                </tr>
                <tr>
                    <td>Тип разъема для зарядки</td>
                    <td>{specifications.connectortype}</td>
                </tr>
                </tbody>
            </table>

            <h2 className={styles.table_title}>Дополнительная информация</h2>
            <table className={styles.table_data}>
                <tbody>
                <tr>
                    <td>Комплектация</td>
                    <td>{specifications.supplies}</td>
                </tr>
                <tr>
                    <td>Дата анонсирования</td>
                    <td>{specifications.announcedate}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </>
);

export default React.memo(Specification);
