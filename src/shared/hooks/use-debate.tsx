import {useState, useCallback} from 'react';

import useHttp from "./use-http";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { userActions } from "../../store/userSlice";

const useDebate = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {sendRequest, isLoading} = useHttp();
    const auth = useSelector((state:any) => state.auth);
    const [pagination, setPagination] = useState(0);

    const [isBlocked, setIsBlocked] = useState(false);

    const [data, setData] = useState<any>();

    const deleteDebate = useCallback((id: string) => {
        console.log('deleting');
        if(isLoading) return;
        sendRequest(`http://localhost:5000/api/debates/${id}`, {success: 'Debate deleted successfully.', error: 'Deleting debate failed. Please, try again.'}, 'DELETE', {}, {
            'Authorization': `Bearer ${auth.token}`
        })
            .then((result:any) => {

            })
            .catch(err => {

            })
    }, []);

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
    }, []);

    const getDebates = useCallback(() => {
      if(isBlocked || isLoading) return;
        sendRequest(`http://localhost:5000/api/debates/${pagination}`, {
            error: "Could not get debates.",
          }).then((response: any) => {
            if (!!response.data[0]) {
              setData(response.data);
              setIsBlocked(false);
            } else {
              setIsBlocked(true);
            }
          })
          .catch(err => {

          });
    }, []);

    const toggleFavorite = useCallback((debateId:string) => {
      console.log(debateId);
      sendRequest(`http://localhost:5000/api/users/favorite/${debateId}`, {
        
      }, 'POST', { debateId }, {'Authorization': `Bearer ${auth.token}`}).then((response: any) => {
        if(response.data.add) {
          dispatch(userActions.addFavorite(debateId));
        } else {
          dispatch(userActions.removeFavorite(debateId));
        }
      })
      .catch(err => {

      });
    }, []);

    const getDebateById = useCallback((id:string) => {
      setIsBlocked(true);
      sendRequest(`http://localhost:5000/api/debates/debate/${id}`, {
        error: "Could not get debate with provided id.",
      }).then((response: any) => {
        setData(response.data.debate);
      })
      .catch(err => {

      });
    }, []);

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
    }, []);

    const voteInDebate = useCallback((debateId:string, option: boolean) => {
          sendRequest(`http://localhost:5000/api/debates/vote/${debateId}`, {
            success: 'Your voice matters. Thanks for voting!',
            error: "Could not vote. Please, try again later.",
          }, 'POST', {option}, {
              'Authorization': `Bearer ${auth.token}`
          }).then((response: any) => {
            if(option) {
              setData((prev:any) => prev.find((el:any) => el.id == debateId).likes.push(auth.userId));
            } else {
              setData((prev:any) => prev.find((el:any) => el.id == debateId).dislikes.push(auth.userId));
            }
          })
          .catch(err => {
            
          });
    }, []);

    return {
        deleteDebate,
        addDebate,
        getDebates,
        isBlocked,
        voteInDebate,
        getDebateById,
        editDebate,
        toggleFavorite,
        isLoading,
        data
    }
}

export default useDebate;