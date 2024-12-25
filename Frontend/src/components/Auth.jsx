import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Auth = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    })

    return (
        <>
            {children}
        </>
    )
}

export default Auth
