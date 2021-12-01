import { useEffect, useRef } from "react";

export function usePreviousProps(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}