import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
} from "@material-ui/core";
import {} from "@material-ui/icons";

import Author from "../../../components/Author";
import classes from "./ReputationRankPanel.module.scss";

type Props = {};

const USER_PANEL_RANK_ITEMS = [
  {
    userId: 1,
    name: "Jan Kowalski",
    reputationPoints: 1234,
    image:
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    userId: 2,
    name: "Max Smith",
    reputationPoints: -123,
    image:
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    userId: 3,
    name: "Jan Kowalski",
    reputationPoints: 1234,
    image:
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    userId: 4,
    name: "Jan Kowalski",
    reputationPoints: 1234,
    image:
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    userId: 5,
    name: "Jan Kowalski",
    reputationPoints: 1234,
    image:
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    userId: 6,
    name: "Jan Kowalski",
    reputationPoints: 1234,
    image:
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const ReputationRankPanel = (props: Props) => {
  return (
    <Box className={classes.ReputationRankPanel} component="section">
      <List className={classes.List}>
        {USER_PANEL_RANK_ITEMS.map((user) => (
          <Link key={user.userId} className={classes.Link} to={`/users/${user.userId}`}>
            <ListItem className={classes.ListItem}>
              <Author
                name={user.name}
                image={user.image}
                additionalData={`Reputation points: ${user.reputationPoints}`}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default ReputationRankPanel;
