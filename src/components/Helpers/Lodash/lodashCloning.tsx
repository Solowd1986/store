import clone from "lodash.clonedeep";
import equal from "fast-deep-equal/es6/react";

export function createDeepCopyOfObject<T>(object: T):T {
    return clone(object);
}

/**
 * Принцип сравнения тут не по ссылке, а именно по полям, то есть тут один пустой обьект равен другому пустому обьекту
 *
 * To support ES6 Maps, Sets and Typed arrays equality use fast-deep-equal/es6/*
 * To use with React (avoiding the traversal of React elements' _owner property
 * that contains circular references and is not needed when comparing the elements - use react version of package
 */
export function isEqual<T, K>(object1: T, object2: K):boolean {
    return equal(object1, object2);
}

