import { compose } from "redux";

/**
 * Инициализация блока для отладки redux компонента, в возвращаемую им
 * функцию нужно обернуть в нативный Middlwere для redux
 * Смысл в том, что в composeEnhancers попадает либо базовая функция compose из redux или она же из devtools,
 * в случае, если devtools установлен. В любом случае оборачивая собой middleware, но в первом
 * случае добавляя еще и фунцию отладки
 */
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers =
    typeof window === 'object' && process.env.NODE_ENV === 'development' && devtools
        ?
        devtools({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        :
        compose
;

export default composeEnhancers;
