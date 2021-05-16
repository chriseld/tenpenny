function reduce(initialValues, action) {
    console.log(action.payload);
    switch(action.type) {
        case 'userObject':
            return action.payload.idusers;
        default:
            return initialValues;
    }
}

export default function userObjReducer(initialValues, action) {
    return reduce(initialValues, action) || null;
}