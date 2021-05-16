const userid = (userData) => {
    return {
        type: 'getUserid',
        payload: userData
    }
}

export {userid}