import { Fragment } from "react";

import DebateDemo from "../../components/DebateDemo";

type props = {
    
};

const MyDebates = (props: props) => {
  return (
    <Fragment>
      <DebateDemo />
      <DebateDemo />
      <DebateDemo />
    </Fragment>
  );
};

export default MyDebates;
