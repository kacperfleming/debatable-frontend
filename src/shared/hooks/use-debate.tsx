import {useState, useCallback} from 'react';

import useHttp from "./use-http";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { userActions } from "../../store/userSlice";
import { SendRounded } from '@material-ui/icons';

const useDebate = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {sendRequest, isLoading} = useHttp();
    const auth = useSelector((state:any) => state.auth);
    const [pagination, setPagination] = useState(0);

    const [isBlocked, setIsBlocked] = useState(false);

    const [data, setData] = useState<any>([]);

    const deleteDebate = useCallback((id: string) => {
        if(isLoading) return;
        sendRequest(`http://localhost:5000/api/debates/${id}`, {success: 'Debate deleted successfully.', error: 'Deleting debate failed. Please, try again.'}, 'DELETE', {}, {
            'Authorization': `Bearer ${auth.token}`
        })
            .then((result:any) => {
              setData((prev:any) => prev.filter((debate:any) => debate.id !== id));
            })
            .catch(err => {

            })
    }, [auth.token, isLoading, sendRequest]);

    const addDebate = useCallback((debate:any) => {
        sendRequest(
            "http://localhost:5000/api/debates", {success: 'Yay! Your debate is waiting for people.', error: 'Could not create your debate :(. Please, try again.'},
            "POST",
            {
              title: debate.title,
              description: debate.description,
            },
            {
              "Authorization": `Bearer ${auth.token}`,
            }
          ).then((response:any) => {

            history.push('/');
          })
          .catch(err => {

          });
    }, [auth.token, history, sendRequest]);

    const getDebates = useCallback((url, authOnly) => {
      if(isBlocked || isLoading) return;
        const header = authOnly ? {'Authorization': `Bearer ${auth.token}`} : {};
        console.log(`http://localhost:5000/api/${url}/${pagination}`);
        setIsBlocked(true);
        sendRequest(`http://localhost:5000/api/${url}/${pagination}`, {
            error: "Could not get debates.",
          }, 'GET', {}, header).then((response: any) => {
            console.log(response.data);
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
      sendRequest(`http://localhost:5000/api/users/favorite/${debateId}`, {
        
      }, 'POST', { debateId }, {"Authorization": `Bearer ${auth.token}`}).then((response: any) => {
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
      sendRequest(`http://localhost:5000/api/debates/debate/${id}`, {
        error: "Could not get debate with provided id.",
      }).then((response: any) => {
        setData(response.data.debate);
      })
      .catch(err => {

      });
    }, [sendRequest]);

    const editDebate = useCallback((id:string, description:string) => {
      sendRequest(`http://localhost:5000/api/debates/${id}`, {
        error: "Could not get debate with provided id.",
      }, 'PATCH', {
        description
      }, {
        'Authorization': `Bearer ${auth.token}`
      }).then((response: any) => {
        setData(response.data.debate);
      })
      .catch(err => {

      });
    }, [auth.token, sendRequest]);

    const voteInDebate = useCallback((debateId:string, option: boolean) => {
          sendRequest(`http://localhost:5000/api/debates/vote/${debateId}`, {
            success: 'Your voice matters. Thanks for voting!',
            error: "Could not vote. Please, try again later.",
          }, 'POST', {option}, {
              'Authorization': `Bearer ${auth.token}`
          }).then((response: any) => {
              setData((prev:any) => {
                const state = prev;
                const index = prev.findIndex((debate:any) => debate.id === debateId);
                const updatedDebate = prev[index];
                if(option) {
                  updatedDebate.likes.push(auth.userId)
                } else {
                  updatedDebate.dislikes.push(auth.userId)
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