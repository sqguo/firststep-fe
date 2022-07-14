import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserStartAction } from "../../store/actionCreators";
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';

import "./preference.scss"

interface Props {
  preferences: string[];
  isLoading: boolean;
}

const Preference: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.currentUser );
  const id = user?.profile?.id || 0;
  const name = user?.profile?.displayName || "noname";
  // supply props to small shared components, otherwise use useSelector hook instead (for page containers)
  // add additional states and actions to control app state where applicable
  const { preferences, isLoading } = props;

  const onButtonClick = (id: number) => {
    dispatch(getCurrentUserStartAction("843424"));
  }
  
  return (
    <div className="preference">
      <h2 className="preference__header">Preference</h2>
      {isLoading ? <h3>loading</h3> : <React.Fragment>
         {/* see https://mui.com/material-ui/material-icons/?query=hamb&selected=Menu */}
        <MenuIcon fontSize="small" color="secondary"/>
        <h3>{id}</h3>
        <h3>{name}</h3>
      </React.Fragment>}
      <Button onClick={() => onButtonClick(2305)}>Get users</Button>
    </div>
  );
};

export default Preference;
