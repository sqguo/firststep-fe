import React, { FunctionComponent } from "react";
import { useDispatch } from 'react-redux'
import { getOpenLoginModalAction } from "../../store/actionCreators";
import Button from '@mui/material/Button';

interface Props {}

const Homepage: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();

  const onOpenLoginModal = () => {
    dispatch(getOpenLoginModalAction());
  }
  
  return (
    <div className="homepage">
      <h2 className="homepage__header">Homepage</h2>
      <Button onClick={onOpenLoginModal}>Login</Button>
    </div>
  );
};

export default Homepage;
