import { useEffect, useRef } from "react";

export function usePreviousProps(value: string | undefined):undefined | string {
    const ref = useRef<undefined | string>();
    useEffect(() => {
        ref.current = value;
    });


    return ref.current;
}
