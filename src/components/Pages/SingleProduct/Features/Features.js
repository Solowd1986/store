import React from "react";
import styles from "./features.module.scss";

const Features = ({ promo }) => (
    <>
        {promo.map((item) => (
            <div key={item.title} className={styles.wrapper}>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.desc}>{item.desc}</p>
                {item.img_path && <img className={styles.img} src={`${item.img_path}`} alt={item.img_alt} />}
            </div>
        ))}
    </>
);

export default Features;
