import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount - 1);
        }, 1000);

        // Redirect
        if (count === 0) {
            navigate('/');
        }
        return () => clearInterval(interval);
    }, [count, navigate]);

    return (
        <div>
            <h1>No Permission, redirect in {count}</h1>
            <h1>Please Login</h1>
        </div>
    );
}

export default LoadingToRedirect;
