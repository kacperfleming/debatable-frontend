import { Fab, Badge, Tooltip } from "@material-ui/core";
import {
  ExpandMore,
  ExpandLess,
  ThumbUp,
  ThumbDown,
  Delete,
  Edit,
} from "@material-ui/icons";
import { useSelector } from "react-redux";

import classes from "./DebateControls.module.scss";

type props = {
  handleDescription: () => void;
  showDescription: boolean;
  authorMode?: boolean;
  hasDescription: boolean;
  onDelete: () => void;
  onEdit: () => void;
};

const DebateControls = (props: props) => {

  return (
    <section
      className={`${classes.Controls} ${
        !props.authorMode ? classes.Dense : ""
      }`}
    >
      {props.authorMode ? (
        <Tooltip title="Delete">
          <Fab onClick={props.onDelete} size="small">
            <Delete />
          </Fab>
        </Tooltip>
      ) : null}

      <Badge badgeContent={2} color="primary">
        <Tooltip title="Disagree">
          <Fab size="small" color="secondary">
            <ThumbDown />
          </Fab>
        </Tooltip>
      </Badge>
      {props.hasDescription ? (
        <Tooltip
          onClick={props.handleDescription}
          title={props.showDescription ? "Less" : "More"}
        >
          <Fab size="small">
            {props.showDescription ? <ExpandLess /> : <ExpandMore />}
          </Fab>
        </Tooltip>
      ) : null}
      <Badge badgeContent={99} color="secondary">
        <Tooltip title="Agree">
          <Fab size="small" color="primary">
            <ThumbUp />
          </Fab>
        </Tooltip>
      </Badge>
      {props.authorMode ? (
        <Tooltip title="Edit">
          <Fab onClick={props.onEdit} size="small">
            <Edit />
          </Fab>
        </Tooltip>
      ) : null}
    </section>
  );
};

export default DebateControls;
