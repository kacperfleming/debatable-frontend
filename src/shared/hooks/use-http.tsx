import {useState, useCallback} from 'react';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';

import { UIActions } from '../../store/ui-slice';

type method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const useHttp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const sendRequest = useCallback((url:string, message?:{success?:string, error?:string}, method:method='GET', data?:object, headers?:object) => {
        setIsLoading(true);
        console.log(url);
        return new Promise<AxiosResponse>((resolve, reject) => {
            axios({
               method: method,
               url: url,
               data: data,
               headers: headers
           })
           .then((response:AxiosResponse) => {
               console.log(response);
               setError(null);
               setIsLoading(false);
               if(response.statusText === "OK") {
                   if(method !== 'GET') dispatch(UIActions.setNotification({message: response.data?.message || message?.success || 'Action completed successfully!', type: 'success'}));
                   resolve(response);
               }
           })
           .catch(err => {
               console.log(err?.response);
               console.log(err?.message);
               console.log(err?.errorMessage);
               dispatch(UIActions.setNotification({message: err.response?.data?.message || message?.error || 'Action failed! Please, try again.', type: 'error'}));
               setIsLoading(false);
               setError(err);
               reject(err);
           });
        })
    }, [dispatch]);

    return {
        sendRequest,
        error,
        isLoading
    }
}

export default useHttp;