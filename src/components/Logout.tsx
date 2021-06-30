import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router';

import {authActions} from '../store/authSlice';

const Logout = () => {
    const dispatch = useDispatch();
    dispatch(authActions.logout());

    return <Redirect to="/auth" />
}

export default Logout;