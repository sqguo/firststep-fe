import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction } from "../../store/actionCreators";
import Button from '@mui/material/Button';

interface Props {
  preferences: string[];
  isLoading: boolean;
}

const Preference: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.currentUser );
  const id = user?.profile?.id || 0;
  const name = user?.profile?.displayName || "noname";
  const { preferences, isLoading } = props;

  const onButtonClick = (id: number) => {
    dispatch(getUserAction(id));
  }
  
  return (
    <div>
      <h2>Preference</h2>
      <h3>{id}</h3>
      <h3>{name}</h3>
      <Button onClick={() => onButtonClick(2305)}>Get users</Button>
    </div>
  );
};

export default Preference;
