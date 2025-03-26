import  axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookies';

export default function AuthUser() {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = Cookies.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = Cookies.getItem("user");
        const userDetails = JSON.parse(userString);
        return userDetails;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        setUser(user);
        Cookies.setItem("token", JSON.stringify(token), { SameSite: 'None' });
        Cookies.setItem("user", JSON.stringify(user), { SameSite: 'None' });
        setUser(user);
        setToken(token);
        if (user.role === "admin") {
            navigate("/dashboard");
        }
        else {
            navigate("/");
        }
    }

    const logout = () => {
        Cookies.removeItem('user', { SameSite: 'None' });
        Cookies.removeItem('token', { SameSite: 'None' });
        navigate("/login");
    }


    const http = axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    })

    const httpForm = axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
        }
    })

    const khalti = axios.create({
        baseURL: "https://a.khalti.com/api/v2/",
        headers: {
            "Authorization": "key 4e5e25b56ae546dc86b4574b9ece7038",
            "Content-type": "application/json",
        }
    })

    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        httpForm,
        khalti,
        logout,
    }
}   