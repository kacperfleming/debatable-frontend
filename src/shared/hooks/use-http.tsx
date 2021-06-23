import {useState} from 'react';
import axios from 'axios';

type method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const useHttp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = (url:string, method:method, data?:object) => {
        setIsLoading(true);
        return axios({
            method: method,
            url: url,
            data: data
        })
        .then(response => {
            setError(null);
            setIsLoading(false);
            if(response.statusText === 'OK') {
                return response;
            }
        })
        .catch(err => {
            setIsLoading(false);
            setError(err);
        });
    }

    return {
        sendRequest,
        error,
        isLoading
    }
}

export default useHttp;