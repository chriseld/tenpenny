import React, { useState, useEffect } from 'react';

function homeGuest() {

    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);

    return (
        <div>
            <button id="login" onClick={() => setLogin(true)}>Login</button>
            <button id="register" onClick={() => setRegister(true)}>Register</button>
        </div>
    )
}

export {homeGuest}
