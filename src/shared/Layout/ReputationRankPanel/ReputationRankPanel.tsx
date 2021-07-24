import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
} from "@material-ui/core";
import {} from "@material-ui/icons";

import useHttp from "../../hooks/use-http";
import Author from "../../../components/Author";
import classes from "./ReputationRankPanel.module.scss";

type Props = {

};

const ReputationRankPanel = (props: Props) => {
  const {sendRequest} = useHttp();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(users.length > 0) return;
    sendRequest('http://localhost:5000/api/users/rank')
      .then((response:any) => {
        console.log(response);
        setUsers(response.data.users);
      })
      .catch(err => {

      });
  }, [sendRequest, users]);

  return (
    <Box className={classes.ReputationRankPanel} component="section">
      <List className={classes.List}>
        {users.length > 0 && users.map((user:any) => (
          <Link key={user.id} className={classes.Link} to={`/users/${user.id}`}>
            <ListItem className={classes.ListItem}>
              <Author
                name={user.username}
                avatar={user.avatar}
                additionalData={`Reputation: ${user.reputation}`}
                style={{fontSize: "0.75rem"}}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default ReputationRankPanel;
