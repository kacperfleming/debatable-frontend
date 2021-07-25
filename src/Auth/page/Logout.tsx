import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router';

import {authActions} from '../../store/authSlice';

const Logout = () => {
    const dispatch = useDispatch();
    dispatch(authActions.logout());
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');

    return <Redirect to="/auth" />
}

export default Logout;