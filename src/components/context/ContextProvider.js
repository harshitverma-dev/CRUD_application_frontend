import React, { createContext, useState } from 'react'

export const addData = createContext();
export const updateData = createContext();
export const deleteData = createContext();

function ContextProvider({ children }) {
    const [useradd, setUseradd] = useState("");  //user add alert state
    const [userUpdateData, setUserUpdateData] = useState("") // user update alert state
    const [storeDeleteData, setStoreDeleteData] = useState() // user delete alert state
    return (
        <addData.Provider value={{ useradd, setUseradd }}>
            <updateData.Provider value={{ userUpdateData, setUserUpdateData }}>
                <deleteData.Provider value={{ storeDeleteData, setStoreDeleteData }}>
                    {children}
                </deleteData.Provider>
            </updateData.Provider>
        </addData.Provider>
    )
}

export default ContextProvider
