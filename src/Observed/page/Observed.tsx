import { Fragment } from "react";
import {LinearProgress} from '@material-ui/core';

import useDebates from "../../shared/hooks/use-debates";
import useAsyncLoading from "../../shared/hooks/use-asyncLoading";
import DebateDemo from "../../shared/components/DebateDemo/DebateDemo";

type Props = {};

const Observed = (props: Props) => {
  const debates = useDebates({url: "users/observed", auth: true});
  console.log(debates);

  return debates;
};

export default Observed;
