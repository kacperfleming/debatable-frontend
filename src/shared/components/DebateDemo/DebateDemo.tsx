import { useState } from "react";
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
  List,
} from "@material-ui/core";
import { green, blue, red, pink, grey } from "@material-ui/core/colors";
import {
  ExpandMore,
  Bookmark,
  ThumbDown,
  ThumbUp,
  Edit,
  Delete,
} from "@material-ui/icons";
import clsx from "clsx";
import {Link} from 'react-router-dom';

interface Props {
  title: string;
  description?: string;
  author: string;
  authorId: string;
  avatar: string;
  created_at: number;
  id: string;
  likes: number;
  dislikes: number;

  voted: false | 'liked' | 'disliked';
  userId?: string;
  observed?: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onVote: (id: string, option: boolean) => void;
  onToggleObserv: (id: string) => void;
};

const rnd = Math.floor(Math.random() * 3 + 1);

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    maxWidth: 600,
    margin: "0 auto 20px",
    background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
  },
  content: {
    color: theme.palette.common.white,
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
  votingOption: {
    background: `radial-gradient(${theme.palette.info.dark} 1%, transparent 90%)`,
  },
  votingIcon: {
    color: theme.palette.common.white,
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

  const [showDescription, setShowDescription] = useState(false);

  const onHandleDescription = () =>
    setShowDescription((prevState) => !prevState);

  const date = new Date(props.created_at);

  return (
    <List className={styles.root}>
      <Card className={styles.card}>
        <CardHeader
          avatar={
            <Link to={`/user/${props.authorId}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <Avatar
                src={`${process.env.REACT_APP_STATIC}/${props.avatar}` || ""}
                aria-label="user avatar"
                className={styles.avatar}
              >
                {props.author[0].toLocaleUpperCase()}
              </Avatar>
            </Link>
          }
          action={
            props.userId && (
              <Tooltip title="Observe">
              <IconButton
                onClick={() => props.onToggleObserv(props.id)}
                aria-label="add to favorites"
              >
                <Bookmark color={props.observed ? "secondary" : "inherit"} />
              </IconButton>
              </Tooltip>
            )
          }
          title={<Link to={`/user/${props.authorId}`} style={{textDecoration: 'none', color: 'inherit'}}>{props.author}</Link>}
          subheader={`${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
          ).padStart(2, "0")}/${String(date.getFullYear())}`}
        />
        <CardContent className={styles.content}>
          <Typography variant="h5" color="inherit" component="h2">
            {props.title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box className={styles.reactions}>
            <Badge badgeContent={props.dislikes} color="primary">
              <IconButton
                className={styles.votingOption}
                aria-label="disagree with author"
                onClick={() => props.onVote(props.id, false)}
              >
                <ThumbDown className={styles.votingIcon} style={{color: props.voted ? (props.voted === 'disliked' ? pink[600] : grey[600]) : 'white'}} />
              </IconButton>
            </Badge>
            <Badge badgeContent={props.likes} color="primary">
              <IconButton
                className={styles.votingOption}
                aria-label="agree with author"
                onClick={() => props.onVote(props.id, true)}
              >
                <ThumbUp className={styles.votingIcon} style={{color: props.voted ? (props.voted === 'liked' ? blue[600] : grey[600]) : 'white'}} />
              </IconButton>
            </Badge>
          </Box>
          {(props.description || props.userId === props.authorId) && (
            <Box className={styles.controlls}>
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
          <CardContent className={styles.content}>
            <Typography color="inherit" paragraph>
              {props.description || null}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </List>
  );
};

export default DebateDemo;
