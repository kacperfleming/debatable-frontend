import { useState, useCallback } from "react";

import useHttp from "./use-http";

const useUser = () => {

  const { sendRequest } = useHttp();

  const [user, setUser] = useState<any>();


  const getUser = useCallback((userId:string) => {
    console.log(userId);
    sendRequest(`http://localhost:5000/api/users/user/${userId}`)
      .then((response: any) => {
        setUser(response.data.user);
      })
      .catch((err) => {

      });
  }, [sendRequest]);

  return {
    getUser,
    user
  };
};

export default useUser;
