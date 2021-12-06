import React from "react";
import styles from "./brandstory.module.scss";

const BrandStory = ():JSX.Element => (
    <section className={styles.brand_story}>
        <div className={`${styles.brand_story__item} ${styles.milestone_item}`}>
            <div className={styles.brand_story__info}>
                <h2 className={styles.brand_story__title}>
                    Новые <br /> вершины
                </h2>
                <div className={styles.brand_story__text_slide}>
                    <h4 className={styles.brand_story__subtitle}>
                        Завораживающий <br /> 120 Гц экран
                    </h4>
                    <p className={styles.brand_story__desc}>
                        Мы представили в OnePlus 8 Pro лидирующий в отрасли жидкостный жидкокристаллический дисплей с
                        частотой 90 Гц.
                    </p>
                    <a className={styles.brand_story__link} href="/">
                        Узнать больше...
                    </a>
                </div>
            </div>
        </div>
        <div className={`${styles.brand_story__item} ${styles.achivments_item}`}>
            <div className={styles.brand_story__info}>
                <h2 className={styles.brand_story__title}>
                    Достижения <br /> компании
                </h2>
                <div className={styles.brand_story__text_slide}>
                    <h4 className={styles.brand_story__subtitle}>
                        Игровой режим <br /> «Fnatic Mode»
                    </h4>
                    <p className={styles.brand_story__desc}>
                        В сотрудничестве с профессиональной киберспортивной командой Fnatic был создан режим OnePlus
                        Gaming
                    </p>
                    <a className={styles.brand_story__link} href="/">
                        Узнать больше...
                    </a>
                </div>
            </div>
        </div>
        <div className={`${styles.brand_story__item} ${styles.our_people_item}`}>
            <div className={styles.brand_story__info}>
                <h2 className={styles.brand_story__title}>
                    Наше <br /> сообщество
                </h2>
                <div className={styles.brand_story__text_slide}>
                    <h4 className={styles.brand_story__subtitle}>
                        Создаем наши устройства <br />
                        вместе с вами!
                    </h4>
                    <p className={styles.brand_story__desc}>
                        Мы провели множество глобальных ивентов и митапов в 11 странах и 26 городах, с более чем 15 000
                        участников
                    </p>
                    <a className={styles.brand_story__link} href="/">
                        Узнать больше...
                    </a>
                </div>
            </div>
        </div>
    </section>
);

export default React.memo(BrandStory);
