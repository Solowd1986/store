import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { History } from 'history';

interface Main {
    history: History,
    children?: React.ReactNode
}

const ScrollToTop = ({ history, children }: Main):JSX.Element => {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return ():void => {
            unlisten();
        };
    }, [history]);
    return <>{children}</>;
};

export default withRouter(ScrollToTop);
