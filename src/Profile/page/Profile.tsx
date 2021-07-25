import {useEffect} from 'react';
import {Box, Typography, Avatar, Card, makeStyles} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import {} from '@material-ui/icons';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import useUser from '../../shared/hooks/use-user';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: grey[200],
        width: '100%',
        padding: '15px 5px 0'
    },
    notFoundCard: {
        padding: 20
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
            {user ? (
                <Box className={styles.header}>  
                    <Avatar src=''>{user.username.slice(0, 1).toUpperCase}</Avatar>
                    <Typography style={{fontWeight: 'bolder', marginBottom: 10}} color="textPrimary" component="h1" variant="h4">{user.username}</Typography>
                    <Typography color="textSecondary" paragraph>Reputation: {user.reputation}</Typography>
                    <Typography color="textSecondary" paragraph>Debates: {user.debates.length}</Typography>
                    {/* {date && (<Typography color="textSecondary" paragraph>Joined in: {`${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")}/${String(date.getFullYear())}`}</Typography>)} */}
                </Box>
            ) : <Card className={styles.notFoundCard}><Typography style={{fontWeight: 'bolder', marginBottom: 10}} color="textPrimary" component="h1" variant="h5">There is no user width provided id.</Typography></Card>
        }
        </Box>
    );
}

export default Profile;