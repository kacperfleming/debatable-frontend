import {useEffect, useRef, useState} from 'react';
import { Avatar, Typography } from "@material-ui/core";
import {CSSProperties} from 'react';

import classes from "./Author.module.scss";

type Props = {
  name: string;
  additionalData?: string;
  avatar: string;
  style?: CSSProperties;
};

const Author = (props: Props) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setAvatar(props.name[0].toUpperCase());
    const image = imageRef.current;

      function onLoadImage() {
        setAvatar(null);
      }

      image?.addEventListener('load', onLoadImage);

      return () => image?.removeEventListener('load', onLoadImage);
  }, [props.name, imageRef]);

  return (
      <section className={classes.Author} style={props.style}>
          <Avatar
            ref={imageRef}
            className={classes.Avatar}
            alt="Avatar"
            src={`http://localhost:5000/${props.avatar}` || ''}
          >
            {avatar}
          </Avatar>
            <Typography className={classes.Name} component="h2">{props.name}</Typography>
            {props.additionalData ? <Typography className={classes.AdditionalData} component="p">{props.additionalData}</Typography> : null}
      </section>
  );
};

export default Author;
