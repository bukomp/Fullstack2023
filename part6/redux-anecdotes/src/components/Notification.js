import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clearNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const { message, show } = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  return show ? <div style={style}>{message}</div> : null;
};

export default Notification;
