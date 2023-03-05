import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOpenLoginModalAction,
  getShowHomepageWalkthroughAction,
  getLogoutStartAction,
} from "../../store/actionCreators";
import history from "../../history";
import { useAuth0 } from "@auth0/auth0-react";

import { Button, IconButton, Popover } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import ProfileIcon from "../../assets/profile.svg";
import "./AppBar.scss";
import classNames from "classnames";
import usePopoverHandler from "../hooks/usePopoverHandler";
import useUserProfile from "../hooks/useUserProfile";

const logo = require("../../assets/logo.png");
const homepageImage = require("../../assets/homepage.png");
const onboardingImage = require("../../assets/onboarding.png");
const clipcart = require("../../assets/login.png");

export default function MyAppBar() {
  const dispatch = useDispatch();
  const { user, loginWithRedirect, logout } = useAuth0();

  const { userProfile: profile, isOnboardingCompleted } = useUserProfile();
  const displayName = profile?.displayName;
  const avatarURL = profile?.avatarURL;

  const appBarRef = useRef<HTMLDivElement>(null);
  const {
    openPopover: openPopover1,
    setOpenPopover: setOpenPopover1,
    setHoveredPopover: setHoveredPopover1,
    setHoveredPopoverButton: setHoveredPopoverButton1,
  } = usePopoverHandler();

  // TODO generic component
  const {
    openPopover: openPopover2,
    setOpenPopover: setOpenPopover2,
    setHoveredPopover: setHoveredPopover2,
    setHoveredPopoverButton: setHoveredPopoverButton2,
  } = usePopoverHandler();

  const onClickLogout = () => {
    setOpenPopover2(false);
    logout({ openUrl: false });
    dispatch(getLogoutStartAction());
    history.push("/");
  };

  const renderProfile = () => {
    return (
      <div
        className="AppBar__profile"
        onMouseOver={() => setHoveredPopoverButton2(true)}
        onMouseLeave={() => setHoveredPopoverButton2(false)}
      >
        <div className="AppBar__profile__avatar-container">
          {avatarURL ? <img src={avatarURL}></img> : <ProfileIcon />}
        </div>
        <div className="AppBar__profile__name-container">
          <span>{displayName || "You"}</span>
        </div>
      </div>
    );
  };

  const renderPopover1 = () => {
    return (
      <Popover
        id={"appbar-popover"}
        className="AppBar__popover"
        open={openPopover1}
        anchorEl={appBarRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{ vertical: -16, horizontal: 0 }}
        sx={{ pointerEvents: "none" }}
      >
        <div
          className="AppBar__popover__content"
          style={{ pointerEvents: "all" }}
          onMouseOver={() => setHoveredPopover1(true)}
          onMouseLeave={() => setHoveredPopover1(false)}
        >
          <div
            className="AppBar__popover__content__section"
            onClick={() => {
              setOpenPopover1(false);
              if (!isOnboardingCompleted) {
                history.push("/onboarding/profile");
              } else {
                history.push("/dashboard");
              }
            }}
          >
            <img src={homepageImage as string} />
            <div className="AppBar__popover__content__text-container">
              <div className="AppBar__popover__content__title">Dashboard</div>
              <div className="AppBar__popover__content__description">
                Get the latest matching status and connect with your FYDP group.
              </div>
            </div>
          </div>
          <div
            className="AppBar__popover__content__section"
            onClick={() => {
              setOpenPopover1(false);
              history.push("/onboarding/profile");
            }}
          >
            <img src={onboardingImage as string} />
            <div className="AppBar__popover__content__text-container">
              <div className="AppBar__popover__content__title">Preferences</div>
              <div className="AppBar__popover__content__description">
                Update your preferences so we can provide more accurate matches
              </div>
            </div>
          </div>
        </div>
      </Popover>
    );
  };

  const renderPopover2 = () => {
    return (
      <Popover
        id={"appbar-popover"}
        className="AppBar__popover2"
        open={openPopover2}
        anchorEl={appBarRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{ vertical: -16, horizontal: "right" }}
        sx={{ pointerEvents: "none" }}
      >
        <div
          className="AppBar__popover2__content"
          style={{ pointerEvents: "all" }}
          onMouseOver={() => setHoveredPopover2(true)}
          onMouseLeave={() => setHoveredPopover2(false)}
        >
          <div className="AppBar__popover2__content__clipart">
            <img src={clipcart}></img>
          </div>
          <div className="AppBar__popover2__content__email2">signed in as</div>
          <div className="AppBar__popover2__content__email3">
            <span>{user?.email}</span>
          </div>
          <div className="AppBar__popover2__content__verified">
            <>
              {user?.email_verified ? (
                <>
                  <VerifiedIcon /> <span>verified</span>
                </>
              ) : (
                <>
                  <NewReleasesIcon className="warning-icon" />{" "}
                  <span>verification required</span>
                </>
              )}
              {user?.email_verified && (
                <>
                  <span>&nbsp;</span>
                  {isOnboardingCompleted ? (
                    <>
                      <AssignmentTurnedInIcon /> <span>onboarding</span>
                    </>
                  ) : (
                    <>
                      <SimCardAlertIcon className="warning-icon" />{" "}
                      <span>onboarding</span>
                    </>
                  )}
                </>
              )}
            </>
          </div>
          <div className="AppBar__popover2__content__logout">
            <Button
              className="actionButton"
              variant="outlined"
              color="inherit"
              onClick={onClickLogout}
            >
              <LogoutIcon />
              &nbsp;&nbsp;Log out
            </Button>
          </div>
        </div>
      </Popover>
    );
  };

  return (
    <div className="AppBar__wrapper">
      {renderPopover1()}
      {profile && renderPopover2()}
      <div className="AppBar" ref={appBarRef}>
        <div className="AppBar__content">
          <div className="AppBar__content__section1">
            <div
              className="AppBar__menu-button-wrapper"
              onMouseOver={() => setHoveredPopoverButton1(true)}
              onMouseLeave={() => setHoveredPopoverButton1(false)}
            >
              <IconButton
                className={classNames({
                  actionIconButton: true,
                  actionIconButton__active: openPopover1,
                })}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setOpenPopover1(true)}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div className="AppBar__logo">
              <img src={logo as string} onClick={() => history.push("/")}></img>
            </div>
            <div className="AppBar__content__how_it_works">
              <span
                onClick={() => {
                  dispatch(getShowHomepageWalkthroughAction(true));
                  history.push("/");
                }}
              >
                How it works
              </span>
            </div>
            <div className="AppBar__content__about_us">
              <span onClick={() => history.push("/about")}>About us</span>
            </div>
          </div>
          {profile ? (
            renderProfile()
          ) : (
            <Button
              className="actionButton"
              variant="outlined"
              color="inherit"
              onClick={() => loginWithRedirect()}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
