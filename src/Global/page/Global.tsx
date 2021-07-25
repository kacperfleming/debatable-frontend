import { useEffect, Fragment } from "react";
import { LinearProgress } from "@material-ui/core";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

import useDebates from "../../shared/hooks/use-debates";
import useAsyncLoading from "../../shared/hooks/use-asyncLoading";
import useScrollMonitor from "../../shared/hooks/useScrollMonitor";
import useDebate from "../../shared/hooks/use-debate";
import DebateDemo from "../../shared/components/DebateDemo/DebateDemo";
import { string } from "yargs";

type Props = {

};

const Global = (props: Props) => {
  const debates = useDebates({url: 'debates', auth: false});

  return debates;
};

export default Global;
