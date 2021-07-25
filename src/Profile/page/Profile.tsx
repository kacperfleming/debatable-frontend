import {useEffect} from 'react';
import {Box, Typography, Avatar, makeStyles} from '@material-ui/core';
import {} from '@material-ui/icons';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import useUser from '../../shared/hooks/use-user';

const useStyles = makeStyles({
    root: {

    }
});

type Props = {

}

const Profile = () => {
    const styles = useStyles();
    const {getUser, user} = useUser();
    const params:any = useParams();

    const {uid} = params;
    useEffect(() => {
        getUser(uid);
    }, [uid]);

    let date:any;
    if(user && user.date_of_joining) date = new Date(user.date_of_joining);

    return (
        <Box className={styles.root}>
            {user && (
                <>  
                    <Avatar src=''>{user.username.slice(0, 1).toUpperCase}</Avatar>
                    <Typography color="textPrimary" component="h1" variant="h3">{user.username}</Typography>
                    <Typography color="textSecondary" paragraph>Reputation: {user.reputation}</Typography>
                    <Typography color="textSecondary" paragraph>Debates: {user.debates.length}</Typography>
                    {/* {date && (<Typography color="textSecondary" paragraph>Joined in: {`${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")}/${String(date.getFullYear())}`}</Typography>)} */}
                </>
            )}
        </Box>
    );
}

export default Profile;