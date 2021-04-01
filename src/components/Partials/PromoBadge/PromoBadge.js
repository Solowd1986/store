import React, { PureComponent } from 'react';
import cn from 'classnames';
import styles from './promo-badge.module.scss';

class PromoBadge extends PureComponent {
    render() {
        return (
            <ul className={cn('wrapper', styles.promotion_badge)}>
                <li className={styles.promotion_badge__item}>
                    <svg className={styles.promotion_badge__img} viewBox="0 0 52 52" width={50} height={50}>
                        <path d="M35.64 1.99H16.36L7 11.36v15.53c0 7.84 3.67 15.05 9.81 19.3 2.78 1.92 5.7 3.16 8.94 3.79l.19.03.19-.03c3.31-.65 6.36-1.92 9.06-3.79C41.34 41.94 45 34.73 45 26.89V11.36l-9.36-9.37zM19.71 33.2l-1.145 1.145-3.511-10.535 1.896-.633 2.497 7.489c2.858-2.73 10.402-9.623 16.162-12.091l.787 1.838c-6.74 2.889-16.588 12.69-16.687 12.788z" />
                    </svg>
                    <div className={styles.promotion_badge__caption_wrapper}>
                        <p className={styles.promotion_badge__caption_lg}>Гарантия один год.</p>
                        <p className={styles.promotion_badge__caption_sm}>Расширенная - два года</p>
                    </div>
                </li>

                <li className={styles.promotion_badge__item}>
                    <svg className={styles.promotion_badge__img} viewBox="0 0 22 22" width={50} height={50}>
                        <path d="M6.83 5.19l1.65.23a1.45 1.45 0 0 0 1.36-.56l1-1.33a1.45 1.45 0 0 1 2.32 0l1 1.33a1.45 1.45 0 0 0 1.36.56l1.65-.23a1.45 1.45 0 0 1 1.64 1.64l-.23 1.65a1.45 1.45 0 0 0 .56 1.36l1.33 1a1.45 1.45 0 0 1 0 2.32l-1.33 1a1.45 1.45 0 0 0-.56 1.36l.23 1.65a1.45 1.45 0 0 1-1.64 1.64l-1.65-.23a1.45 1.45 0 0 0-1.36.56l-1 1.33a1.45 1.45 0 0 1-2.32 0l-1-1.33a1.45 1.45 0 0 0-1.36-.56l-1.65.23a1.45 1.45 0 0 1-1.64-1.64l.23-1.65a1.45 1.45 0 0 0-.56-1.36l-1.33-1a1.45 1.45 0 0 1 0-2.32l1.33-1a1.45 1.45 0 0 0 .56-1.36l-.23-1.65a1.45 1.45 0 0 1 1.64-1.64z" />
                        <circle fill="white" cx={12} cy={12} r={2.56} />
                    </svg>
                    <div className={styles.promotion_badge__caption_wrapper}>
                        <p className={styles.promotion_badge__caption_lg}>Оригинальная техника.</p>
                        <p className={styles.promotion_badge__caption_sm}>Устройства на русском</p>
                    </div>
                </li>

                <li className={styles.promotion_badge__item}>
                    <svg className={styles.promotion_badge__img} viewBox="0 0 32 32" width={45} height={45}>
                        <path d="M16 0C9.373 0 4 5.373 4 12s10 20 12 20 12-13.373 12-20S22.627 0 16 0zm0 20c-4.412 0-8-3.59-8-8s3.588-8 8-8 8 3.59 8 8-3.588 8-8 8z" />
                    </svg>
                    <div className={styles.promotion_badge__caption_wrapper}>
                        <p className={styles.promotion_badge__caption_lg}>Самовывоз в Москве.</p>
                        <p className={styles.promotion_badge__caption_sm}>Метро: Парк Победы</p>
                    </div>
                </li>
            </ul>
        );
    }
}

export default PromoBadge;
