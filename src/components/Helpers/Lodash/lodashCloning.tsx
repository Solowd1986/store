import clone from "lodash.clonedeep";

export default function createDeepCopyOfObject<T>(object: T):T {
    return clone(object);
}
