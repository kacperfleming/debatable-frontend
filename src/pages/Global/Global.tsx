import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";

import useHttp from "../../shared/hooks/use-http";
import DebateDemo from "../../components/DebateDemo";
import classes from "./Global.module.scss";

type Props = {};

const Global = (props: Props) => {
  const { sendRequest, isLoading, error } = useHttp();

  const [debates, setDebates] = useState([]);

  console.log(debates);

  useEffect(() => {
    sendRequest("http://localhost:5000/api/debates", "GET").then((response) => {
      if (response) setDebates(response.data.debates);
    });
  }, [sendRequest]);


  return (
    <div>
      {isLoading && <CircularProgress />}
      {debates.length > 0 && debates.map((debate:any) => <DebateDemo key={debate.id} title={debate.title} creationDate={debate.creationDate} authorId={debate.creator.id} author={debate.creator.username} avatar={debate.creator.avatar} />)}
    </div>
  );
};

export default Global;
