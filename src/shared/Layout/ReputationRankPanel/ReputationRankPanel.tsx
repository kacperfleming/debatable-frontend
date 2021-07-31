import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, makeStyles } from "@material-ui/core";

import useHttp from "../../hooks/use-http";
import Author from "./Author";

interface Props {

};

const useStyles = makeStyles((theme) => ({
  reputationRankPanel: {
    position: "fixed",
    top: "64px",
    right: 0,
    width: "25vw",
    height: "calc(100vh - 56px)",
    boxShadow: "0 -5px 5px grey",
    overflowY: "auto",
    display: "none",

    "&::-webkit-scrollbar": {
      display: "none",
    },

    "@media (min-width: 900px)": {
      display: "block",
      width: "20vw",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    transition: theme.transitions.create('background', {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeOut
    }),
    "&:hover": {
      background: theme.palette.primary.light,
    },
  },
  list: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: 0,
  },
}));

const ReputationRankPanel = (props: Props) => {
  const styles = useStyles(props);

  const { sendRequest, isLoading } = useHttp();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (users.length > 0 || isLoading) return;
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/rank`)
      .then((response: any) => {
        setUsers(response.data.users);
      })
      .catch((err) => {});
  }, [sendRequest, users, isLoading]);

  return (
    <Box className={styles.reputationRankPanel} component="section">
      <List className={styles.list}>
        {users.length > 0 &&
          users.map((user: any) => (
            <Link key={user.id} className={styles.link} to={`/user/${user.id}`}>
              <ListItem>
                <Author
                  name={user.username}
                  avatar={user.avatar}
                  additionalData={`Reputation: ${user.reputation}`}
                  style={{ fontSize: "0.75rem" }}
                />
              </ListItem>
            </Link>
          ))}
      </List>
    </Box>
  );
};

export default ReputationRankPanel;
