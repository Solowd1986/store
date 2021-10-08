import { useEffect } from "react";
import { useDispatch, useStore } from 'react-redux'
import { useHistory } from "react-router-dom";
import { createHistoryInstance } from "@redux/entities/server/actions";

export default function HistoryInstance() {
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useStore().getState();
    if (!store.server.history) {
        dispatch(createHistoryInstance(history));
    }

    return null;
}


