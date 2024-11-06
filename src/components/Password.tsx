import React from 'react'

const Password = () => {

    const createRandomString = () => {
        const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '[', ']', '<', '>', '/', '|', '~'];
        const data = Math.floor(Math.random() * (0xFFFF - 0x20) + 0x20);
        console.log(data);
    }
    return (
        <div>
            <button onClick={createRandomString}>Add</button>
        </div>
    )
}

export default Password
