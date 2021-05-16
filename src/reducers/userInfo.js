const username = (state = null, action) => {
    switch (action.type) {
        case 'getUsername':
            return (action.payload);
        default:
            return state;
    }
};

const userid = (state = null, action) => {
    switch (action.type) {
        case 'getUserid':
            return (action.payload);
        default:
            return state;
    }
};

const useremail = (state = null, action) => {
    switch (action.type) {
        case 'getUseremail':
            return (action.payload);
        default:
            return state;
    }
};

const userrole = (state = null, action) => {
    switch (action.type) {
        case 'getUserrole':
            return (action.payload);
        default:
            return state;
    }
};

export { username, userid, useremail, userrole }