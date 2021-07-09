import { useEffect, useState, Fragment, useCallback } from "react";
import { CircularProgress } from "@material-ui/core";
import { useInView } from "react-intersection-observer";

import useHttp from "../../shared/hooks/use-http";
import DebateDemo from "../../components/DebateDemo";
import classes from "./Global.module.scss";

type Props = {};

const Global = (props: Props) => {
  const { ref: containerRef, inView, entry } = useInView({ threshold: 1 });

  const { sendRequest, isLoading, error } = useHttp();

  const [debates, setDebates] = useState([]);

  const [lock, setLock] = useState(false);

  const [pagination, setPagination] = useState(0);

  useEffect(() => {
    if (isLoading || error) return;
    sendRequest(`http://localhost:5000/api/debates/${pagination}`, {
      error: "Could not get debates.",
    }).then((response: any) => {
      if (!!response.data.debates[0]) {
        setDebates((prevDebates) => prevDebates.concat(response.data.debates));
        setLock(false);
      } else {
        setLock(true);
      }
    });
  }, [sendRequest, pagination]);


  if (inView && !lock && !isLoading) {
    setPagination((prevState) => prevState + 1);
    setLock(true);
  }

  return (
    <Fragment>
      {isLoading && <div style={{textAlign: 'center'}}><CircularProgress /></div>}
      {debates.length > 0 && (
        <Fragment>
          <div>
            {debates.length > 0 &&
              debates.map((debate: any, i, arr) => (
                <DebateDemo
                  key={debate.id}
                  description={debate.description}
                  title={debate.title}
                  created_at={debate.created_at}
                  authorId={debate.creator.id}
                  author={debate.creator.username}
                  avatar={debate.creator.avatar}
                />
              ))}
          </div>
          {!isLoading ? <div ref={containerRef}></div> : <div style={{textAlign: 'center'}}><CircularProgress /></div>}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Global;
