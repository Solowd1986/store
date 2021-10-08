import { useDispatch, useStore } from 'react-redux'
import { useHistory } from "react-router-dom";
import { createHistoryInstance } from "@redux/entities/server/actions";

/**
 * При попытке использования useEffect столкнулся с тем, что history не успевает записатсья в state до того,
 * как будет вызван fetch в компоненте, и при ошибке - вызов push в async action. В этот момент history еще нет.
 * Но без useEffect оно выставиться успевает. Хотя useEffect обязателньо для side effects, тут речь про синхронную операцию записи в
 * Redux, так что по идее проблем быть не должно
 * */
export default function HistoryInstance() {
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useStore().getState();

    if (!store.server.history) {
        dispatch(createHistoryInstance(history));
    }

    return null;
}


