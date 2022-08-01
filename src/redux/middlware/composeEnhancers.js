import { compose } from "redux";

/**
 * Данный код в любом случае возвращает функцию compose для обьединения разных "расширения" в createStore, будь это
 * middlware или dev-отладчик. Отличие лишь в том, что если первое условие выполняется, то вернется специфическая версия
 * compose c фунцией отладки из расширения devtools, если же нет - то обычный compose из Redux.
 */
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // Это как раз тот "специфический" compose
const composeEnhancers =
    typeof window === "object" && process.env.NODE_ENV === "development" && devtools
        ? devtools({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;
export default composeEnhancers;
