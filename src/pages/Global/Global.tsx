import { useEffect, useState, Fragment, useCallback } from "react";
import { CircularProgress } from "@material-ui/core";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";

import { debateActions } from "../../store/debateSlice";
import useHttp from "../../shared/hooks/use-http";
import DebateDemo from "../../components/DebateDemo";
import classes from "./Global.module.scss";

type Props = {};

let mountedBefore = false;

const Global = (props: Props) => {
  const { ref: containerRef, inView, entry } = useInView({ threshold: 1 });

  const dispatch = useDispatch();

  const { sendRequest, isLoading, error } = useHttp();

  const debates = useSelector((state:any) => state.debates.debates);

  const [lock, setLock] = useState(false);

  const pagination = useSelector((state:any) => state.debates.pagination);

  useEffect(() => {
    console.log(inView);
    console.log(lock);
    if (isLoading || error || !inView || lock) return;
    sendRequest(`http://localhost:5000/api/debates/${pagination}`, {
      error: "Could not get debates.",
    }).then((response: any) => {
      if (!!response.data.debates[0]) {
        dispatch(debateActions.fetchDebates(response.data.debates));
        dispatch(debateActions.incrementPagination(5));
        setLock(false);
      } else {
        setLock(true);
      }
    });
    setLock(true);
  }, [sendRequest, pagination, inView, lock]);

  // if (inView && !lock && !isLoading) {
  //   console.log(inView);
  //   console.log('INCREMENTING PAGINATION');

  //   setLock(true);
  // }

  return (
    <Fragment>
      {isLoading && <div style={{textAlign: 'center'}}><CircularProgress /></div>}
      {debates.length > 0 && (
          <div>
            {debates.length > 0 &&
              debates.map((debate: any) => (
                <DebateDemo
                  key={debate.id}
                  id={debate.id}
                  description={debate.description}
                  title={debate.title}
                  created_at={debate.created_at}
                  authorId={debate.creator.id}
                  author={debate.creator.username}
                  avatar={debate.creator.avatar}
                />
              ))}
          </div>
      )}
      {!isLoading && !lock ? <div ref={containerRef}></div> : <div style={{textAlign: 'center'}}><CircularProgress /></div>}
    </Fragment>
  );
};

export default Global;
