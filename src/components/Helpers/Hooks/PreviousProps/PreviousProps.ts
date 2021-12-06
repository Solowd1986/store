import { useEffect, useRef } from "react";

export function usePreviousProps(value: unknown):undefined | unknown {
    const ref = useRef<undefined | unknown>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
