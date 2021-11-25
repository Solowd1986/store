
import React, { useState, createContext, useContext, forwardRef, useMemo, useEffect, useRef } from "react";


const Input = (props, ref) => {
    return (
        <div ref={ref}>{props.data}</div>
    )
};

export default forwardRef(Input);
