import useHttp from "./use-http";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { debateActions } from "../../store/debateSlice";

const useDebate = () => {
    const history = useHistory();
    const {sendRequest, isLoading} = useHttp();
    const token = useSelector((state:any) => state.auth.token);

    const dispatch = useDispatch();

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
          });
    }

    return {
        deleteDebate,
        addDebate
    }
}

export default useDebate;