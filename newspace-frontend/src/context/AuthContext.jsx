// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "../api/userinfoApi";

// AuthContext 생성
const AuthContext = createContext({
    isAuthorized: false,
    user: null,
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState(null);

    // 사용자 정보 불러오기 함수
    const fetchUserInfo = async () => {
        try {
            const userInfo = await getUserInfo();
            if (userInfo) {
                setUser(userInfo);
                setIsAuthorized(true);
                localStorage.setItem("user", JSON.stringify(userInfo)); // 사용자 정보 저장
            } else {
                setIsAuthorized(false);
                setUser(null);
                localStorage.removeItem("isAuthorized");
                localStorage.removeItem("user");
            }
        } catch (error) {
            console.error("사용자 정보 조회 실패:", error);
        }
    };

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthorized") === "true";

        if (storedAuth) {
            setIsAuthorized(true);
            fetchUserInfo(); 
        }
    }, []);

    const login = async () => {
        setIsAuthorized(true);
        localStorage.setItem("isAuthorized", "true");
        await fetchUserInfo(); 
    };

    const logout = () => {
        setIsAuthorized(false);
        setUser(null); 
        localStorage.removeItem("isAuthorized");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isAuthorized, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
