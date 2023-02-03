import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import classnames from "classnames";
import * as actions from "../../store/actionCreators";
import { useAuth0 } from "@auth0/auth0-react";
import { Divider, Button, Modal, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import theme from "../styles/theme";
import "./LoginModal.scss";
import history from "../../history";


const clipcart = require("../../assets/login.png");

interface Props {}

enum ModalState {
  SignUp, // UNUSED
  Choice,
  Logout,
}

const LoginModal: FunctionComponent<Props> = () => {
  const [modalState, setModalState] = useState(ModalState.Choice);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailSubmittable, setIsEmailSubmittable] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(
    "Signup with your uwaterloo email"
  );

  const dispatch = useDispatch();
  const { user, loginWithRedirect, logout } = useAuth0();
  const isLoginModalOpen = useSelector(
    (state: AppState) => state.isLoginModalOpen
  );
  const currentUser = useSelector((state: AppState) => state.currentUser);
  const isLoggedIn = !!currentUser && !!user;
  const isSigningIn = useSelector(
    (state: AppState) => state.isLoadingCurrentUser
  );
  const isVerifyingNewEmail = useSelector(
    (state: AppState) => state.isVerifyingNewEmail
  );
  const isNewEmailAccepted = useSelector(
    (state: AppState) => state.isNewEmailValid
  );
  const newEmailRejectionReason = useSelector(
    (state: AppState) => state.newEmailRejectionReason
  );

  useEffect(() => {
    if (!isVerifyingNewEmail) {
      if (isNewEmailAccepted) {
        setEmailHelperText("Check you mailbox for an verification email");
      } else if (newEmailRejectionReason) {
        setEmailHelperText(
          "sorry, " + newEmailRejectionReason + ", please try again..."
        );
        setIsEmailSubmittable(false);
        setIsEmailValid(false);
      }
    }
  }, [isNewEmailAccepted, newEmailRejectionReason, isVerifyingNewEmail]);

  const onCloseLoginModal = () => {
    setModalState(ModalState.Choice);
    dispatch(actions.getCloseLoginModalAction());
  };

  const onClickSignIn = () => {
    loginWithRedirect();
  };

  const onClickSignUp = () => {
    setModalState(ModalState.SignUp);
  };

  const onClickLogout = () => {
    logout({ openUrl: false });
    dispatch(actions.getLogoutStartAction());
    history.push('/');
  };

  const debouncedUpdateEmailErrorDisplay = useCallback(
    _.debounce((showError: boolean, allowSubmission: boolean) => {
      if (!allowSubmission) {
        setEmailHelperText("Must be a valid uwaterloo email");
      } else {
        setEmailHelperText("Looks good, click confirm to signup");
      }
      setIsEmailValid(!showError);
    }, 1000),
    []
  );

  const updateEmailValidity = (email: string) => {
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const uwaterlooEmailRegex = /^[A-Za-z0-9._%+-]+@uwaterloo\.ca$/;
    const isEmail = emailRegex.test(email);
    const isUWaterlooEmail = uwaterlooEmailRegex.test(email);
    const isValid = isEmail && isUWaterlooEmail;
    setIsEmailSubmittable(isValid);
    const showError = email ? !isValid : false;
    debouncedUpdateEmailErrorDisplay(showError, isValid);
  };

  const debouncedUpdateEmailValidity = useCallback(
    _.debounce(updateEmailValidity, 50),
    []
  );

  const onEmailInputChange = (event: any) => {
    const email = _.toLower(event.target.value);
    setEnteredEmail(email);
    debouncedUpdateEmailValidity(email);
  };

  const onSubmitEmail = () => {
    updateEmailValidity(enteredEmail);
    if (isEmailSubmittable) {
      dispatch(actions.getCheckNewEmailStartAction(enteredEmail));
    }
  };

  const renderSignUpContent = () => {
    return (
      <div
        className={classnames({
          "login-modal__signup-container": true,
          "signup-success-container": isNewEmailAccepted,
        })}
      >
        <div className="login-modal__signup-textfield-block">
          <ThemeProvider theme={theme}>
            <TextField
              required
              id="outlined-required"
              label="Required"
              variant="filled"
              placeholder="m23goose@uwaterloo.ca"
              onChange={onEmailInputChange}
              disabled={isVerifyingNewEmail || isNewEmailAccepted}
              error={!isEmailValid}
              helperText={emailHelperText}
              fullWidth
            />
          </ThemeProvider>
        </div>
        <div className="login-modal__signup-confirmation-block">
          <LoadingButton
            variant="contained"
            size="large"
            disabled={!isEmailSubmittable || isNewEmailAccepted}
            loading={isVerifyingNewEmail}
            onClick={onSubmitEmail}
            fullWidth
          >
            {isNewEmailAccepted ? <CheckCircleIcon /> : <span>Confirm</span>}
          </LoadingButton>
        </div>
      </div>
    );
  };

  const renderChoiceContent = () => {
    return (
      <div className="login-modal__choice-container">
        <div className="login-modal__signin-choice-block">
          <LoadingButton
            variant="contained"
            size="large"
            onClick={onClickSignIn}
            loading={isSigningIn}
            disabled={isLoggedIn}
          >
            Sign In
          </LoadingButton>
        </div>
        <Divider>OR</Divider>
        {/* <div
          className="login-modal__signup-choice-block"
          onClick={onClickSignUp}
        >
          <Button variant="contained" size="large">
            Sign Up
          </Button>
        </div> */}
        <div className="login-modal__signup-choice-block">
          <LoadingButton
            variant="contained"
            size="large"
            loading={isSigningIn}
            onClick={onClickLogout}
            disabled={!isLoggedIn}
          >
            Log Out
          </LoadingButton>
        </div>
      </div>
    );
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
          {modalState === ModalState.Choice && renderChoiceContent()}
          {modalState === ModalState.SignUp && renderSignUpContent()}
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
