import {useState, useCallback} from 'react';

import { RootState } from '../../store';

import useHttp from "./use-http";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { userActions } from "../../store/userSlice";

export interface Debate {
  id: string;
  title: string;
  description: string;
  created_at: number;
  creator: string | object;
  comments: string[] | [] | object[];
  likes: string[];
  dislikes: string[];

}

const useDebate = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {sendRequest, isLoading} = useHttp();
    const auth = useSelector((state:RootState) => state.auth);
    const [pagination, setPagination] = useState(0);

    const [isBlocked, setIsBlocked] = useState(false);

    const [data, setData] = useState<any>([]);

    const deleteDebate = useCallback((id: string) => {
        if(isLoading) return;
        sendRequest(`${process.env.REACT_APP_BACKEND_URL}/debates/${id}`, {success: 'Debate deleted successfully.', error: 'Deleting debate failed. Please, try again.'}, 'DELETE', {}, {
            'Authorization': `Bearer ${auth.token}`
        })
            .then((response) => {
              setData((prev:Array<object>) => prev.filter((debate:any) => debate.id !== id));
            })
            .catch(err => {

            })
    }, [auth.token, isLoading, sendRequest]);

    const addDebate = useCallback((debate:any) => {
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/debates`, {success: 'Yay! Your debate is waiting for people.', error: 'Could not create your debate :(. Please, try again.'},
            "POST",
            {
              title: debate.title,
              description: debate.description,
            },
            {
              "Authorization": `Bearer ${auth.token}`,
            }
          ).then((response) => {

            history.push('/');
          })
          .catch(err => {

          });
    }, [auth.token, history, sendRequest]);

    const getDebates = useCallback((url, authOnly) => {
      if(isBlocked || isLoading) return;
        const header = authOnly ? {'Authorization': `Bearer ${auth.token}`} : {};
        setIsBlocked(true);
        sendRequest(`${process.env.REACT_APP_BACKEND_URL}/${url}/${pagination}`, {
            error: "Could not get debates.",
          }, 'GET', {}, header).then((response) => {
            if (!!response.data[0]) {
              setPagination(prev => +prev + 5);
              setData((prev:any) => prev.concat(response.data));
              setIsBlocked(false);
            } else {
              setIsBlocked(true);
            }
          })
          .catch(err => {

          });
    }, [pagination, isBlocked, isLoading, auth.token, sendRequest]);

    const toggleObserv = useCallback((debateId:string) => {
      console.log(debateId);
      sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/favorite/${debateId}`, {
        
      }, 'POST', { debateId }, {"Authorization": `Bearer ${auth.token}`}).then((response) => {
        if(response.data.add) {
          dispatch(userActions.addFavorite(debateId));
        } else {
          dispatch(userActions.removeFavorite(debateId));
        }
      })
      .catch(err => {

      });
    }, [auth.token, dispatch, sendRequest]);

    const getDebateById = useCallback((id:string) => {
      setIsBlocked(true);
      sendRequest(`${process.env.REACT_APP_BACKEND_URL}/debates/debate/${id}`, {
        error: "Could not get debate with provided id.",
      }).then((response) => {
        setData(response.data.debate);
      })
      .catch(err => {

      });
    }, [sendRequest]);

    const editDebate = useCallback((id:string, description:string) => {
      sendRequest(`${process.env.REACT_APP_BACKEND_URL}/debates/${id}`, {
        error: "Could not get debate with provided id.",
      }, 'PATCH', {
        description
      }, {
        'Authorization': `Bearer ${auth.token}`
      }).then((response) => {
        setData(response.data.debate);
      })
      .catch(err => {

      });
    }, [auth.token, sendRequest]);

    const voteInDebate = useCallback((debateId:string, option: boolean) => {
          sendRequest(`${process.env.REACT_APP_BACKEND_URL}/debates/vote/${debateId}`, {
            success: 'Your voice matters. Thanks for voting!',
            error: "Could not vote. Please, try again later.",
          }, 'POST', {option}, {
              'Authorization': `Bearer ${auth.token}`
          }).then((response) => {
              setData((prev: Debate[] | []) => {
                const state = prev;
                const index = prev.findIndex((debate:any) => debate.id === debateId);
                const updatedDebate = prev[index];
                if(auth.userId) {
                  if(option) {
                    updatedDebate.likes.push(auth.userId)
                  } else {
                    updatedDebate.dislikes.push(auth.userId)
                  }
                }
                state[index] = updatedDebate;
                return state;
              });
          })
          .catch(err => {
            
          });
    }, [auth.token, auth.userId, sendRequest]);

    return {
        deleteDebate,
        addDebate,
        getDebates,
        isBlocked,
        voteInDebate,
        getDebateById,
        editDebate,
        toggleObserv,
        isLoading,
        data
    }
}

export default useDebate;