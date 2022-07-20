import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOpenLoginModalAction } from "../../store/actionCreators";

import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./AppBar.scss";

const defaultProfile = require("../../assets/profile.png");

export default function MyAppBar() {
  const dispatch = useDispatch();

  const profile = useSelector(
    (state: AppState) => state.currentUser?.profile
  );
  const displayName = profile?.displayName;
  const avatarURL = profile?.avatarURL;

  const onOpenLoginModal = () => {
    dispatch(getOpenLoginModalAction());
  };

  const renderProfile = () => {
    return (
        <div className="AppBar__profile">
            <div className="AppBar__profile__avatar-container">
                <img src={ avatarURL || defaultProfile }></img>
            </div>
            <div className="AppBar__profile__name-container">
                <span>{ displayName || "Gosling8137" }</span>
            </div>
        </div>
    );
  };

  return (
    <div className="AppBar__wrapper">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FirstStep
            </Typography>
            {profile ? renderProfile() :<Button color="inherit" onClick={onOpenLoginModal}>Login</Button>}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
