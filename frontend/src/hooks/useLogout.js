import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../actions/userActions';

function useLogout() {
  const dispatch = useDispatch();
  const history = useHistory();
  return function () {
    history.push('/');
    dispatch(logout());
  };
}

export default useLogout;
