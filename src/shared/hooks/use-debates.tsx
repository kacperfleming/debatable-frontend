import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {LinearProgress} from '@material-ui/core';

import DebateDemo from "../components/DebateDemo/DebateDemo";
import useAsyncLoading from "./use-asyncLoading";
import useDebate from "./use-debate";

const useDebates = ({url, auth}:{url:string, auth:boolean}) => {
    const history = useHistory();

    const { data:debates, border, isLoading } = useAsyncLoading({ step: 5, url, auth});

    const { deleteDebate, voteInDebate, toggleFavorite } = useDebate();
  
    const userId = useSelector((state: any) => state.auth.userId);
  
    const observed = useSelector((state: any) => state.user.favorites);
  
    const deleteDebateHandler = (id:string) => deleteDebate(id);
  
    const editDebateHandler = (id:string) => history.push(`/edit/${id}`);
  
    const voteHandler = (id:string, option: boolean) => voteInDebate(id, option);
  
    const toggleObservHandler = (id:string) => toggleFavorite(id);

    return (
        <>
          {debates.length > 0 &&
            debates.map((el: any) => (
              <DebateDemo
                key={el.id}
                id={el.id}
                description={el.description}
                title={el.title}
                created_at={el.created_at}
                authorId={el.creator.id}
                author={el.creator.username}
                avatar={el.creator.avatar}
                likes={el.likes.length}
                dislikes={el.dislikes.length}

                userId={userId}
                observed={observed.find((id:string) => id === el.id)}
                onDelete={(id:string) => deleteDebateHandler(id)}
                onEdit={(id:string) => editDebateHandler(id)}
                onVote={(id:string, option:boolean) => voteHandler(id, option)}
                onToggleObserv={(id:string) => toggleObservHandler(id)}
              />
            ))}
            {isLoading && <LinearProgress style={{marginBottom: 20}}/>}
            {border}
        </>
      );
}

export default useDebates;