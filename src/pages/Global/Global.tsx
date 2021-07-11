import { useEffect, useState, Fragment, useCallback } from "react";
import { CircularProgress } from "@material-ui/core";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";

import { debateActions } from "../../store/debateSlice";
import useDebate from "../../shared/hooks/use-debate";
import useHttp from "../../shared/hooks/use-http";
import DebateDemo from "../../components/DebateDemo";
import classes from "./Global.module.scss";

type Props = {};

const Global = (props: Props) => {
  const { ref: containerRef, inView, entry } = useInView({ threshold: 0.1 });

  const {getDebates, isBlocked} = useDebate();

  const debates = useSelector((state:any) => state.debates.debates);

  useEffect(() => {
    if (!inView || isBlocked) return;
    getDebates();
  }, [inView, isBlocked]);

  return (
    <Fragment>
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
                  likes={debate.likes.length}
                  dislikes={debate.dislikes.length}
                />
              ))}
          </div>
      )}
      {!isBlocked ? <div style={{height: 200}} ref={containerRef}></div> : <div style={{textAlign: 'center'}}><CircularProgress /></div>}
    </Fragment>
  );
};

export default Global;
