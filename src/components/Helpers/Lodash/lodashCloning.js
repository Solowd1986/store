export default function createDeepCopyOfObject(object) {
    const cloneDeep = require("lodash.clonedeep");
    return cloneDeep(object);
}
