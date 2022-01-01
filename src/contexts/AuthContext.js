import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function useUserInfo(){
    return useContext(AuthContext);
}

export function ClientUserProvider({ children }){

    const [userInfo, setUserInfo] = useState({});
    const kcraftekClientUser = {
        userInfo: userInfo,
        setUserInfo: setUserInfo
    }

    return (
        <AuthContext.Provider value={kcraftekClientUser}>
            
                {children}
            
        </AuthContext.Provider>
    )
}