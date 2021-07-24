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

  const toggleFavorite = (debateId: string) => {
    sendRequest(
      `http://localhost:5000/api/users/favorite/${debateId}`,
      {},
      "POST",
      { debateId },
      { Authorization: `Bearer ${token}` }
    )
      .then((response: any) => {
        if (response.data.add) {
          dispatch(userActions.addFavorite(debateId));
        } else {
          dispatch(userActions.removeFavorite(debateId));
        }
      })
      .catch((err) => {});
  };

//   const getUser = (userId:string) => {
//     sendRequest(`http://localhost:5000/api/users/${userId}`)
//       .then((response: any) => {
//         setUser(response.data.user);
//       })
//       .catch((err) => {

//       });
//   };

  return {
    toggleFavorite,
  };
};

export default useUser;
