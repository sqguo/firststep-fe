import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOpenLoginModalAction} from "../../store/actionCreators";
import history from "../../history";

import {
    Box,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Typography, Drawer, List, ListItem,
} from "@mui/material";
import {Menu as MenuIcon, Dashboard as DashboardIcon} from "@mui/icons-material";
import "./AppBar.scss";

const defaultProfile = require("../../assets/profile.png");

export default function MyAppBar() {
    const dispatch = useDispatch();

    const profile = useSelector(
        (state: AppState) => state.currentUser?.profile
    );
    const displayName = profile?.displayName;
    const avatarURL = profile?.avatarURL;
    const [openDrawer, setOpenDrawer] = useState(false);

    const onOpenLoginModal = () => {
        dispatch(getOpenLoginModalAction());
    };

    // TODO: REMOVE DEVELOPMENT CONFIG
    const onNavigateToDashboard = () => {
        dispatch(getOpenLoginModalAction());
    }

    const renderProfile = () => {
        return (
            <div className="AppBar__profile" onClick={onNavigateToDashboard}>
                <div className="AppBar__profile__avatar-container">
                    <img src={avatarURL || defaultProfile}></img>
                </div>
                <div className="AppBar__profile__name-container">
                    <span>{displayName || "Gosling8137"}</span>
                </div>
            </div>
        );
    };

    const renderDrawer = () => {
        return (
            <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Box onClick={() => setOpenDrawer(false)}>
                    <List>
                        <ListItem>
                            <Typography variant="h5" mx={1}>
                                Full Menu coming soon!
                            </Typography>
                        </ListItem>
                        {profile && <>
                            <ListItem sx={{
                                ':hover': {
                                    bgcolor: '#f8f8f8',
                                },
                            }} style={{
                                cursor: 'pointer'
                            }}
                                      onClick={() => history.push('/dashboard')}>
                                <DashboardIcon/>
                                <Typography mx={1}>
                                    Dashboard
                                </Typography>
                            </ListItem>
                        </>}
                    </List>
                </Box>
            </Drawer>
        )
    }

    return (
        <div className="AppBar__wrapper">
            <Box sx={{flexGrow: 1}}>
                {renderDrawer()}
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon onClick={() => setOpenDrawer(!openDrawer)}/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}} style={{cursor: 'pointer'}}
                                    onClick={
                                        () => history.push('/')
                                    }>
                            FirstStep
                        </Typography>
                        {profile ? renderProfile() : <Button color="inherit" onClick={onOpenLoginModal}>Login</Button>}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
