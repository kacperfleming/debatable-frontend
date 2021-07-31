import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { RootState } from "../../store";

import DebateDemo from "../components/DebateDemo/DebateDemo";
import useAsyncLoading from "./use-asyncLoading";

const useDebates = ({url, auth}:{url:string, auth:boolean}) => {
    const history = useHistory();

    const { data:debates, border, voteInDebate, deleteDebate, toggleObserv } = useAsyncLoading({ step: 5, url, auth});
  
    const userId = useSelector((state: RootState) => state.auth.userId);
  
    const observed = useSelector((state: RootState) => state.user.observed);
  
    const deleteDebateHandler = (id:string) => deleteDebate(id);
  
    const editDebateHandler = (id:string) => history.push(`/edit/${id}`);
  
    const voteHandler = (id:string, option: boolean) => voteInDebate(id, option);
  
    const toggleObservHandler = (id:string) => toggleObserv(id);

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
                observed={!!observed.find((id:string) => id === el.id)}
                voted={((el.likes.find((user:any) => user === userId) && 'liked') || (el.dislikes.find((user:any) => user === userId) && 'disliked'))}
                onDelete={(id:string) => deleteDebateHandler(id)}
                onEdit={(id:string) => editDebateHandler(id)}
                onVote={(id:string, option:boolean) => voteHandler(id, option)}
                onToggleObserv={(id:string) => toggleObservHandler(id)}
              />
            ))}
            {border}
        </>
      );
}

export default useDebates;