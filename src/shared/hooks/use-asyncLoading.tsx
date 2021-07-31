import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CircularProgress } from "@material-ui/core";

import useDebate from "../../shared/hooks/use-debate";

interface Props {
  step: number;
  url: string;
  auth: boolean;
};

let firstLoading = true;

const useAsyncLoading = (props: Props) => {
  const {getDebates, voteInDebate, deleteDebate, toggleObserv, data, isBlocked, isLoading} = useDebate();

  const { ref: containerRef, inView } = useInView({ threshold: 0.1 });

  const {auth, url} = props;

  useEffect(() => {
    if ((!inView || isBlocked) && !firstLoading) return;
        firstLoading = false;
        getDebates(url, auth);
  }, [inView, isBlocked, getDebates, url, auth]);


  const border = (!isBlocked || isLoading) && (
    <div style={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent' }} ref={containerRef}><CircularProgress /></div>
  );

  return {
    data,
    border,
    isLoading,
    isBlocked,
    voteInDebate,
    deleteDebate,
    toggleObserv
  };
};

export default useAsyncLoading;
