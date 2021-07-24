import { Fragment } from "react";
import {LinearProgress} from '@material-ui/core';

import useAsyncLoading from "../../shared/hooks/use-asyncLoading";
import DebateDemo from "../../components/DebateDemo";

type Props = {};

const Observed = (props: Props) => {
  const { data, border, isLoading }: {data: any, border: any, isLoading: boolean} = useAsyncLoading({ step: 5, url: "users/observed", auth: true });

  return (
    <Fragment>
      {data.length > 0 &&
        data.map((el: any) => (
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
          />
        ))}
        {isLoading && <LinearProgress style={{marginBottom: 20}}/>}
        {border}
    </Fragment>
  );
};

export default Observed;
