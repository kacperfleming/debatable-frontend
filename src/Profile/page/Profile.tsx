import {useEffect} from 'react';
import {Box, Typography, Avatar, LinearProgress, makeStyles} from '@material-ui/core';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { blue } from '@material-ui/core/colors';

import useUser from '../../shared/hooks/use-user';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'inherit'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
        width: '100%',
        padding: '15px 5px 0',
        color: 'white'
    },
    avatar: {
        height: 100,
        width: 100,
        marginBottom: 10
    },
    notFoundCard: {
        padding: 20
    }
}));

interface Props {

}

const Profile = (props: Props) => {
    const styles = useStyles();
    const {getUser, user} = useUser();
    const params:{uid:string} = useParams();

    const {uid} = params;
    useEffect(() => {
        if(user) return;
        getUser(uid);
    }, [uid, getUser, user]);

    let date: Date | undefined;
    if(user && user.date_of_joining) date = new Date(user.date_of_joining);

    return (
        <Box className={styles.root} style={{background: 'inherit'}}>
            {user ? (
                <Box className={styles.header}>  
                    <Avatar className={styles.avatar} src={`${process.env.REACT_APP_STATIC}/${user.avatar}`}>{user.username[0].toUpperCase}</Avatar>
                    <Typography style={{fontWeight: 'bolder', marginBottom: 10}} color="textPrimary" component="h1" variant="h4">{user.username}</Typography>
                    <Typography paragraph>Reputation: {user.reputation}</Typography>
                    <Typography paragraph>Debates: {user.debates.length > 0 ? <Link style={{textDecoration: 'none', color: blue[600]}} to={`/debates/${params.uid}`}>{user.debates.length}</Link> : 0}</Typography>
                    {date && (<Typography paragraph>Joined in: {`${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")}/${String(date.getFullYear())}`}</Typography>)}
                </Box>
            ) : <LinearProgress />
        }
        </Box>
    );
}

export default Profile;