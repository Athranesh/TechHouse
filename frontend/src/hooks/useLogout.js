import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../actions/userActions';

const useLogout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return () => {
    history.push('/');
    dispatch(logout());
  };
};

export default useLogout;
