import React, { createContext, useState } from 'react'
export const CreateUserContext = createContext()
const UserContext = ({ children }) => {
    const [globalUser, setglobaluser] = useState({
        email : '',
        name : ''
    })
    return (
        <div>
            <CreateUserContext.Provider value={{globalUser , setglobaluser}}>
                {children}
            </CreateUserContext.Provider>
        </div>
    )
}

export default UserContext