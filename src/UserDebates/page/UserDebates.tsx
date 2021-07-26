import { Fragment } from "react";
import { useParams } from "react-router";
import {LinearProgress} from '@material-ui/core';

import useDebates from "../../shared/hooks/use-debates";

type Props = {};

const UserDebates = (props: Props) => {
  const params:any = useParams();
  const debates = useDebates({url: `debates/user/${params.uid}`, auth: false});

  return debates;
};

export default UserDebates;
