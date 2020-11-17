import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../actions/orderActions';

const OrderScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const orderData = useSelector((state) => state.getOrder);

  const { loading, success, order } = orderData;

  useEffect(() => {
    //Loading added below to prevent another request when loading is in progress
    if (!order && !loading) {
      dispatch(getOrderById(match.params.id));
    }
  }, [loading, order, dispatch, match.params.id]);

  return <div>OrderSCreen</div>;
};

export default OrderScreen;
