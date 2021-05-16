const username = (userData) => {
    return {
        type: 'getUsername',
        payload: userData
    }
}

export {username}