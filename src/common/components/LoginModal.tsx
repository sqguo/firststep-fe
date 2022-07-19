import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCloseLoginModalAction,
  getCurrentUserStartAction,
} from "../../store/actionCreators";
import history from "../../history";
import { Divider, Button, Modal } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Close as CloseIcon } from "@mui/icons-material";
import "./LoginModal.scss";
const clipcart = require("../../assets/login.png");

interface Props {}

const LoginModal: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const isLoginModalOpen = useSelector(
    (state: AppState) => state.isLoginModalOpen
  );
  const isSigningIn = useSelector(
    (state: AppState) => state.isLoadingCurrentUser
  );

  const onCloseLoginModal = () => {
    dispatch(getCloseLoginModalAction());
  };

  const onClickSignIn = () => {
    dispatch(getCurrentUserStartAction("test@uwaterloo.ca", "/dashboard"));
  };

  const onClickSignUp = () => {
    history.push("/onboarding");
  };

  return (
    <div className="login-modal__login-modal-wrapper">
      <Modal open={isLoginModalOpen} onClose={onCloseLoginModal}>
        <div className="login-modal__content-container">
          <div className="login-modal__close-button-container">
            <div
              className="login-modal__close-button"
              onClick={onCloseLoginModal}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="login-modal__clipcart">
            <img src={clipcart}></img>
          </div>
          <div className="login-modal__signin-block">
            <LoadingButton
              variant="contained"
              size="large"
              onClick={onClickSignIn}
              loading={isSigningIn}
            >
              Sign In
            </LoadingButton>
          </div>
          <Divider>OR</Divider>
          <div className="login-modal__signup-block" onClick={onClickSignUp}>
            <Button variant="contained" size="large">
              Sign Up
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
