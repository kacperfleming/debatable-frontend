import { useEffect, Fragment } from "react";
import { LinearProgress } from "@material-ui/core";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

import useScrollMonitor from "../../shared/hooks/useScrollMonitor";
import useDebate from "../../shared/hooks/use-debate";
import DebateDemo from "../../components/DebateDemo";

type Props = {

};

const Global = (props: Props) => {
  const scrollInfo = useScrollMonitor();

  const { ref: containerRef, inView, entry } = useInView({ threshold: 0.1 });

  const {getDebates, isBlocked, isLoading} = useDebate();

  const debates = useSelector((state:any) => state.debates.debates);


  useEffect(() => {
    if (scrollInfo > 900 || isBlocked) return;
    getDebates();
  }, [scrollInfo, isBlocked]);

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
      {isLoading && <LinearProgress style={{marginBottom: 20}} />}
    </Fragment>
  );
};

export default Global;
