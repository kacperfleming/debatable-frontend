import { useState, useCallback } from "react";

import useHttp from "./use-http";

const useUser = () => {

  const { sendRequest, isLoading } = useHttp();

  const [user, setUser] = useState<any>();


  const getUser = useCallback((userId:string) => {
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/user/${userId}`)
      .then((response: any) => {
        setUser(response.data.user);
      })
      .catch((err) => {

      });
  }, [sendRequest]);

  return {
    getUser,
    user,
    isLoading
  };
};

export default useUser;
