import { useState, useCallback } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Collapse,
  Typography,
  IconButton,
  Avatar,
  Badge,
  makeStyles,
  Box,
  Tooltip,
} from "@material-ui/core";
import { green, blue, red } from "@material-ui/core/colors";
import {
  ExpandMore,
  Bookmark,
  ThumbDown,
  ThumbUp,
  Edit,
  Delete,
} from "@material-ui/icons";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import useDebate from "../../hooks/use-debate";

type Props = {
  title: string;
  description?: string;
  author: string;
  authorId: string;
  avatar: string;
  created_at: number;
  ref?: any;
  id: string;
  likes: number;
  dislikes: number;

  userId: string;
  observed: boolean;
  onDelete: (id:string) => void;
  onEdit: (id:string) => void;
  onVote: (id:string, option:boolean) => void;
  onToggleObserv: (id:string) => void;
};

const rnd = Math.floor(Math.random() * 3 + 1);

const useStyles = makeStyles((theme) => ({
  root: {
    mazWidth: 320,
    marginBottom: 25,
  },
  reactions: {
    display: "flex",
    justifyContent: "space-between",
    width: "15%",
    minWidth: 120,
  },
  controlls: {
    marginLeft: "auto",
    display: "flex",
    justifyContent: "space-between",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor:
      (rnd === 1 && blue[500]) || (rnd === 2 && green[500]) || red[500],
  },
}));

const DebateDemo = (props: Props) => {
  const styles = useStyles();

  // const history = useHistory();

  // const { deleteDebate, voteInDebate, toggleFavorite } = useDebate();

  const [showDescription, setShowDescription] = useState(false);

  // const userId = useSelector((state: any) => state.auth.userId);

  // const favorites = useSelector((state: any) => state.user.favorites);

  const onHandleDescription = () =>
    setShowDescription((prevState) => !prevState);

  // const deleteDebateHandler = () => deleteDebate(props.id);

  // const editDebateHandler = () => history.push(`/edit/${props.id}`);

  // const voteHandler = (option: boolean) => voteInDebate(props.id, option);

  // const toggleFavoriteHandler = () => toggleFavorite(props.id);

  const date = new Date(props.created_at);

  return (
    <Card className={styles.root}>
      <CardHeader
        avatar={
          <Avatar
            src={`http://localhost:5000/${props.avatar}` || ""}
            aria-label="user avatar"
            className={styles.avatar}
          >
            {props.author[0].toLocaleUpperCase()}
          </Avatar>
        }
        action={
          props.userId && (
            <IconButton
              onClick={() => props.onToggleObserv(props.id)}
              aria-label="add to favorites"
            >
              <Bookmark color={props.observed ? 'secondary' : 'disabled'} />
            </IconButton>
          )
        }
        title={props.author}
        subheader={`${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")}/${String(date.getFullYear())}`}
      />
      <CardContent>
        <Typography variant="h5" color="textPrimary" component="h2">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box className={styles.reactions}>
          <Badge badgeContent={props.dislikes} color="secondary">
            <IconButton
              aria-label="disagree with author"
              onClick={() => props.onVote(props.id, false)}
              color="secondary"
            >
              <ThumbDown />
            </IconButton>
          </Badge>
          <Badge badgeContent={props.likes} color="primary">
            <IconButton
              aria-label="agree with author"
              onClick={() => props.onVote(props.id, true)}
              color="primary"
            >
              <ThumbUp />
            </IconButton>
          </Badge>
        </Box>
          {((props.description) || (props.userId == props.authorId)) && (
            <Box
              className={styles.controlls}
            >
              {props.authorId === props.userId && (
                <>
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="edit debate"
                      onClick={() => props.onEdit(props.id)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete debate"
                      onClick={() => props.onDelete(props.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {props.description && (
                <IconButton
                  className={clsx(styles.expand, {
                    [styles.expandOpen]: showDescription,
                  })}
                  onClick={onHandleDescription}
                  aria-expanded={showDescription}
                  aria-label="show more"
                >
                  <ExpandMore />
                </IconButton>
              )}
            </Box>
          )}
      </CardActions>
      <Collapse in={showDescription} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.description || null}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default DebateDemo;
