import React, { useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'USER',
        resumeUrl: '',
        linkedinUrl: '',
        companyUrl: ''
    });

    const clearAll = () => {
        setAuthData({
            email: '',
            password: '',
            name: '',
            role: 'USER',
            resumeUrl: '',
            linkedinUrl: '',
            companyUrl: ''
        });
    };

    return (
        <AuthContext.Provider value={{ authData, setAuthData, clearAll }}>
            {children}
        </AuthContext.Provider>
    );
};
