import {useState} from 'react';

import useHttp from "./use-http";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { debateActions } from "../../store/debateSlice";
import { userActions } from "../../store/userSlice";

const useDebate = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {sendRequest, isLoading} = useHttp();
    const token = useSelector((state:any) => state.auth.token);
    const pagination = useSelector((state:any) => state.debates.pagination);

    const [isBlocked, setIsBlocked] = useState(false);

    const [debate, setDebate] = useState<any>();

    const deleteDebate = (id: string) => {
        console.log('deleting');
        if(isLoading) return;
        sendRequest(`http://localhost:5000/api/debates/${id}`, {success: 'Debate deleted successfully.', error: 'Deleting debate failed. Please, try again.'}, 'DELETE', {}, {
            'Authorization': `Bearer ${token}`
        })
            .then((result:any) => {
                dispatch(debateActions.deleteDebate(id))
                dispatch(debateActions.incrementPagination(-1));
            })
            .catch(err => {

            })
    }

    const addDebate = (debate:any) => {
        sendRequest(
            "http://localhost:5000/api/debates", {success: 'Yay! Your debate is waiting for people.', error: 'Could not create your debate :(. Please, try again.'},
            "POST",
            {
              title: debate.title,
              description: debate.description,
            },
            {
              "Authorization": `Bearer ${token}`,
            }
          ).then((response:any) => {
            dispatch(debateActions.addDebate([response.data.debate]))
            dispatch(debateActions.incrementPagination(1));
            history.push('/');
          })
          .catch(err => {

          });
    }

    const getDebates = () => {
      if(isBlocked || isLoading) return;
        sendRequest(`http://localhost:5000/api/debates/${pagination}`, {
            error: "Could not get debates.",
          }).then((response: any) => {
            console.log(response);
            if (!!response.data.debates[0]) {
              dispatch(debateActions.fetchDebates(response.data.debates));
              dispatch(debateActions.incrementPagination(5));
              setIsBlocked(false);
            } else {
              setIsBlocked(true);
            }
          })
          .catch(err => {

          });
    }

    const toggleFavorite = (debateId:string) => {
      sendRequest(`http://localhost:5000/api/users/favorite/${debateId}`, {
        
      }, 'POST', { debateId }, {'Authorization': `Bearer ${token}`}).then((response: any) => {
        if(response.data.add) {
          dispatch(userActions.addFavorite(debateId));
        } else {
          dispatch(userActions.removeFavorite(debateId));
        }
      })
      .catch(err => {

      });
    }

    const getDebateById = (id:string) => {
      setIsBlocked(true);
      sendRequest(`http://localhost:5000/api/debates/debate/${id}`, {
        error: "Could not get debate with provided id.",
      }).then((response: any) => {
        setDebate(response.data.debate);
      })
      .catch(err => {

      });
    }

    const editDebate = (id:string, description:string) => {
      sendRequest(`http://localhost:5000/api/debates/${id}`, {
        error: "Could not get debate with provided id.",
      }, 'PATCH', {
        description
      }, {
        'Authorization': `Bearer ${token}`
      }).then((response: any) => {
        setDebate(response.data.debate);
        dispatch(debateActions.editEdbate(response.data.debate))
      })
      .catch(err => {

      });
    }

    const voteInDebate = (debateId:string, option: boolean) => {
          sendRequest(`http://localhost:5000/api/debates/vote/${debateId}`, {
            success: 'Your voice matters. Thanks for voting!',
            error: "Could not vote. Please, try again later.",
          }, 'POST', {option}, {
              'Authorization': `Bearer ${token}`
          }).then((response: any) => {
            
          })
          .catch(err => {
            
          });
    }

    return {
        deleteDebate,
        addDebate,
        getDebates,
        isBlocked,
        voteInDebate,
        getDebateById,
        editDebate,
        toggleFavorite,
        debate,
        isLoading
    }
}

export default useDebate;