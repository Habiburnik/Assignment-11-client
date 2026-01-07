import axios from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from '../../provider/AuthContext';
import { useNavigate } from 'react-router-dom';


const AxiosInstance = axios.create({
    // baseURL: 'https://assignment-11-server-sandy-iota.vercel.app',
    baseURL: 'http://localhost:5001',
    withCredentials: true,
});

const UseAxiosSecure = () => {
    const { logOut, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
    AxiosInstance.interceptors.response.use(Response => {
        return Response;
    }, error => {
        if (error.status === 401 || error.status === 403) {
            logOut()
            .then(() => { 
                setLoading(false);
                navigate('/auth/login');
            });
        }
        return Promise.reject(error);
    })
    }, [navigate, logOut, setLoading]);

    return AxiosInstance;
};

export default UseAxiosSecure;