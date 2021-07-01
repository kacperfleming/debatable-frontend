import {useState} from 'react';
import {Paper} from '@material-ui/core';

import TopicCard from "./TopicCard";
import DebateControls from './DebateControls';
import classes from "./DebateDemo.module.scss";

type Props = {};

const DebateDemo = (props: Props) => {
  const [showDescription, setShowDescription] = useState(false);

  const onHandleDescription = () =>
    setShowDescription((prevState) => !prevState);

  return (
    <Paper component="article" className={classes.DebateDemo}>

      <TopicCard showDescription={showDescription} />
      <DebateControls showDescription={showDescription} handleDescription={onHandleDescription} />

    </Paper>
  );
};

export default DebateDemo;


// type Props = {};

// const TopicCard = (props: Props) => {
//   const [showDescription, setShowDescription] = useState(false);

//   const onHandleDescription = () =>
//     setShowDescription((prevState) => !prevState);

//   return (
//     <Paper component="section" className={classes.TopicCard}>
//       <Author
//         name="Jan Kowalski"
//         image="https://images.pexels.com/photos/1680172/pexels-ph….jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//         additionalData="21 June 2021"
//       />
//       <Typography className={classes.Topic} variant="h5" component="h2">
//         Sztuczna inteligencja odmieni życie ludzi na zawsze.
//       </Typography>
//       {showDescription ? (
//         <Typography className={classes.Description} component="p">
//           This is example description of statement above.
//         </Typography>
//       ) : null}
//       <section className={classes.Controls}>
//         <Badge badgeContent={2} color="primary">
//           <Tooltip title="Disagree">
//             <Fab size="small" color="secondary">
//               <ThumbDown />
//             </Fab>
//           </Tooltip>
//         </Badge>
//         <Tooltip
//           onClick={onHandleDescription}
//           title={showDescription ? "Less" : "More"}
//         >
//           <Fab size="small">
//             {showDescription ? <ExpandLess /> : <ExpandMore />}
//           </Fab>
//         </Tooltip>
//         <Badge badgeContent={99} color="secondary">
//           <Tooltip title="Agree">
//             <Fab size="small" color="primary">
//               <ThumbUp />
//             </Fab>
//           </Tooltip>
//         </Badge>
//       </section>
//     </Paper>
//   );
// };

// export default TopicCard;

