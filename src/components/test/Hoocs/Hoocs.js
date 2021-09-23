import React, { useState, useContext, useEffect, useRef } from "react";
import * as ReactDOM from 'react-dom';


export const HookOne = () => {
    const [isUserShowed, toggleUser] = useState(true);

    return (
        <div>
            <p>
                <button>Click me</button>
            </p>
        </div>
    )
};


