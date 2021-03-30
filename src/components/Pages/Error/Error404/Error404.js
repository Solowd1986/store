import React from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./error-404.module.scss";

const Error404 = (props) => (
    <div className={cn("overlay", "overlay__w-bg")}>
        <div className={styles.content}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={453}
                height={155}
            viewBox="0 0 453 155"
          >
                <defs>
                    <path
                        id="prefix__a"
                        d="M393.522 35.018l-35.109 56.361h35.109V35.018zm39.961 91.238v28.181h-39.961v-28.181H319.84v-30.95L378.278.371h55.205v91.008h18.71v34.877h-18.71zM73.823 35.018l-35.11 56.361h35.11V35.018zm39.96 91.238v28.181h-39.96v-28.181H.138v-30.95L58.578.371h55.205v91.008h18.708v34.877h-18.708z"
                  />
          </defs>
            <use xlinkHref="#prefix__a" overflow="visible" fill="#EF6357" />
                <circle fill="#EF6357" cx={228} cy={77} r={77} />
                <path
            fill="#FFF"
                    d="M172.963 110.847l3.93 4.242a.957.957 0 001.426 0 1.151 1.151 0 000-1.54l-1.281-1.569a77.187 77.187 0 0113.663-10.257c.529 2.129 1.626 4.381 3.404 5.521 3.737 2.397 8.769.671 10.991-3.363 0 0 2.427-5.686 3.714-7.741 1.286-2.054 3.721-3.05 4.665-3.245a72.823 72.823 0 0114.737-1.509c18.884 0 37.048 7.34 51.268 20.682l-1.375 1.482a1.148 1.148 0 00.001 1.54.956.956 0 001.425 0l3.93-4.242a1.148 1.148 0 000-1.539c-.196-.213-.454-.318-.712-.318s-.516.105-.714.318l-1.123 1.213c-14.603-13.751-33.281-21.312-52.699-21.312s-38.022 7.483-52.625 21.233l-1.196-1.135c-.198-.213-.456-.318-.714-.318s-.517.105-.713.318a1.147 1.147 0 00-.002 1.539"
          />
          </svg>
            <h1 className={styles.msg}>Страница не найдена</h1>
            <NavLink to="/" className={styles.btn}>
            НА ГЛАВНУЮ
            </NavLink>
      </div>
  </div>
);

export default Error404;
