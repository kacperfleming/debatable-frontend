import {useState} from 'react';
import {Paper, Modal} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useDebate from '../shared/hooks/use-debate';
import TopicCard from "./TopicCard";
import DebateControls from './DebateControls';
import classes from "./DebateDemo.module.scss";

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
};

const DebateDemo = (props: Props) => {
  const history = useHistory();

  const {deleteDebate, voteInDebate} = useDebate();

  const [showDescription, setShowDescription] = useState(false);

  const userId = useSelector((state:any) => state.auth.userId);

  const onHandleDescription = () =>
    setShowDescription((prevState) => !prevState);

  const deleteDebateHandler = () => deleteDebate(props.id);

  const editDebateHandler = () => history.push(`/edit/${props.id}`)

  const voteHandler = (option:boolean) => voteInDebate(props.id, option);

  return (
    <Paper ref={props.ref} component="article" className={classes.DebateDemo}>

      <TopicCard {...props} showDescription={showDescription} />
      <DebateControls {...props} onVote={voteHandler} onDelete={deleteDebateHandler} onEdit={editDebateHandler} authorMode={userId === props.authorId} hasDescription={!!props.description} showDescription={showDescription} handleDescription={onHandleDescription} />

    </Paper>
  );
};

export default DebateDemo;