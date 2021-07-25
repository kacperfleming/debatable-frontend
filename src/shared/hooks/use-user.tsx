import { useState } from "react";

import useHttp from "./use-http";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../store/userSlice";

const useUser = () => {
  const dispatch = useDispatch();

  const { sendRequest, isLoading } = useHttp();
  const token = useSelector((state: any) => state.auth.token);
//   const pagination = useSelector((state: any) => state.debates.pagination);

  const [isBlocked, setIsBlocked] = useState(false);

  const [user, setUser] = useState<any>();


  const getUser = (userId:string) => {
    console.log(userId);
    sendRequest(`http://localhost:5000/api/users/user/${userId}`)
      .then((response: any) => {
        setUser(response.data.user);
      })
      .catch((err) => {

      });
  };

  return {
    getUser,
    user
  };
};

export default useUser;
