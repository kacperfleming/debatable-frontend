import React from "react";

import DebateDemo from "../../components/DebateDemo";
import classes from './Global.module.scss';

type Props = {};

const Global = (props: Props) => {
  return (
    <div>
      <DebateDemo />
      <DebateDemo />
      <DebateDemo />
      <DebateDemo />
      <DebateDemo />
      <DebateDemo />
    </div>
  );
};

export default Global;
