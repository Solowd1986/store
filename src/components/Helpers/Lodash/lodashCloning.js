import clone from 'lodash.clonedeep';

export default function createDeepCopyOfObject(object) {
    return clone(object);
}
