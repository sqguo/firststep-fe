import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOpenLoginModalAction,
  getShowHomepageWalkthroughAction,
} from "../../store/actionCreators";
import history from "../../history";

import { Button, IconButton, Popover } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import ProfileIcon from "../../assets/profile.svg";
import "./AppBar.scss";
import classNames from "classnames";

const logo = require("../../assets/logo.png");
const homepageImage = require("../../assets/homepage.png");
const onboardingImage = require("../../assets/onboarding.png");

export default function MyAppBar() {
  const dispatch = useDispatch();

  const profile = useSelector((state: AppState) => state.currentUser?.profile);
  const displayName = profile?.displayName;
  const avatarURL = profile?.avatarURL;
  const [hoveredPopover, setHoveredPopover] = useState(false);
  const [hoveredPopoverButton, setHoveredPopoverButton] = useState(false);
  const hoveredPopoverRef = useRef(false);
  const hoveredPopoverButtonRef = useRef(false);
  const [openPopover, setOpenPopover] = useState(false);
  const openPopoverRef = useRef(true);
  const closePopoverDelayRef = useRef(false);
  const appBarRef = useRef<HTMLDivElement>(null);

  const onOpenLoginModal = () => {
    dispatch(getOpenLoginModalAction());
  };

  // TODO: REMOVE DEVELOPMENT CONFIG
  const onNavigateToDashboard = () => {
    dispatch(getOpenLoginModalAction());
  };

  useEffect(() => {
    openPopoverRef.current = openPopover;
  }, [openPopover]);

  useEffect(() => {
    hoveredPopoverRef.current = hoveredPopover;
    hoveredPopoverButtonRef.current = hoveredPopoverButton;
    if (hoveredPopover || hoveredPopoverButton) {
      closePopoverDelayRef.current = false;
      setOpenPopover(true);
    }
  }, [hoveredPopover, hoveredPopoverButton]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        !hoveredPopoverRef.current &&
        !hoveredPopoverButtonRef.current &&
        openPopoverRef.current
      ) {
        if (closePopoverDelayRef.current) {
          setOpenPopover(false);
        } else {
          closePopoverDelayRef.current = true;
        }
      }
    }, 200);
    return () => clearInterval(interval);
  }, [
    openPopoverRef,
    hoveredPopoverRef,
    hoveredPopoverButtonRef,
    setOpenPopover,
  ]);

  const renderProfile = () => {
    return (
      <div className="AppBar__profile" onClick={onNavigateToDashboard}>
        <div className="AppBar__profile__avatar-container">
          {avatarURL ? <img src={avatarURL}></img> : <ProfileIcon />}
        </div>
        <div className="AppBar__profile__name-container">
          <span>{displayName || "You"}</span>
        </div>
      </div>
    );
  };

  const renderPopover = () => {
    return (
      <Popover
        id={"appbar-popover"}
        className="AppBar__popover"
        open={openPopover}
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
          onMouseOver={() => setHoveredPopover(true)}
          onMouseLeave={() => setHoveredPopover(false)}
        >
          <div
            className="AppBar__popover__content__section"
            onClick={() => {
              setOpenPopover(false);
              history.push("/dashboard");
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
              setOpenPopover(false);
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

  return (
    <div className="AppBar__wrapper">
      {renderPopover()}
      <div className="AppBar" ref={appBarRef}>
        <div className="AppBar__content">
          <div className="AppBar__content__section1">
            <div
              className="AppBar__menu-button-wrapper"
              onMouseOver={() => setHoveredPopoverButton(true)}
              onMouseLeave={() => setHoveredPopoverButton(false)}
            >
              <IconButton
                className={classNames({
                  actionIconButton: true,
                  actionIconButton__active: openPopover,
                })}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setOpenPopover(true)}
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
              onClick={onOpenLoginModal}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
