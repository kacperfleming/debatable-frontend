import { useEffect, useState, Fragment, useCallback } from "react";
import { CircularProgress } from "@material-ui/core";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {LinearProgress} from '@material-ui/core';

import useDebate from "../../shared/hooks/use-debate";
import useHttp from "../../shared/hooks/use-http";
import DebateDemo from "../components/DebateDemo/DebateDemo";

type Props = {
  step: number;
  url: string;
  auth: boolean;
};

let firstLoading = true;

const useAsyncLoading = (props: Props) => {
  const [pagination, setPagination] = useState(0);

  const [data, setData] = useState([]);

  const [isBlocked, setIsBlocked] = useState(false);

  const { ref: containerRef, inView } = useInView({ threshold: 0.1 });

  const {sendRequest, isLoading} = useHttp();

  const token = useSelector((state:any) => state.auth.token);

  const header = props.auth ? {
    'Authorization': `Bearer ${token}`
  } : {}

  const getData = useCallback(() => {
    sendRequest(`http://localhost:5000/api/${props.url}/${pagination}`, {}, 'GET', {}, header).then((response: any) => {
        if (!!response.data[0]) {
            console.log(response.data);
            setData(prev => prev.concat(response.data))
            setPagination(prev => prev + props.step);
          setIsBlocked(false);
        } else {
          setIsBlocked(true);
        }
      })
      .catch(err => {

      });
}, [props, pagination]);

  useEffect(() => {
    if ((!inView || isBlocked) && !firstLoading) return;
        firstLoading = false;
        setIsBlocked(true);
        getData();
  }, [inView, isBlocked, getData]);


  const border = !isBlocked && (
    <div style={{ height: 100 }} ref={containerRef}></div>
  );

  return {
    data,
    border,
    isLoading,
    isBlocked
  };
};

export default useAsyncLoading;
