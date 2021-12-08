import { IProductTypes } from "@root/types/_core";

export default function arrayShuffle(array: Array<IProductTypes>):Array<IProductTypes> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
