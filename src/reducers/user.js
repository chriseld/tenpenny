const isLogged = (state = false, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return (true);
        case 'LOG_OUT':
            // state = undefined;
            return false;
        default:
            return state;
    }
};

export default isLogged