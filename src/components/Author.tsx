import { Avatar, Typography } from "@material-ui/core";

import classes from "./Author.module.scss";

type Props = {
  name: string;
  additionalData?: string;
  image?: string;
};

const Author = (props: Props) => {
  console.log(props.image);
  return (
      <section className={classes.Author}>
          <Avatar
            className={classes.Avatar}
            alt="Avatar"
            src={props.image || ''}
          >
            {!props.image && props.name[0].toUpperCase()}
          </Avatar>
            <Typography className={classes.Name} variant="h5" component="h2">{props.name}</Typography>
            {props.additionalData ? <Typography className={classes.AdditionalData} component="p">{props.additionalData}</Typography> : null}
      </section>
  );
};

export default Author;
