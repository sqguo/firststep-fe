import React, { FunctionComponent } from "react";
import _ from "lodash";
import { Modal, Avatar } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { randomColorPicker } from "../styles/theme";
import "./ProfileModal.scss";

interface Props {
  userProfile: UserProfile;
  isOpen: boolean;
  onCloseModal: () => void;
}

const ProfileModal: FunctionComponent<Props> = (props) => {
  const { userProfile, isOpen, onCloseModal } = props;
  return (
    <div className="profile-modal__profile-modal-wrapper">
      <Modal open={isOpen} onClose={onCloseModal}>
        <div className="profile-modal__content-container">
          <div className="profile-modal__close-button-container">
            <div className="profile-modal__close-button" onClick={onCloseModal}>
              <CloseIcon />
            </div>
          </div>
          <div className="profile-modal__avatar-wrapper">
            <Avatar
              sx={{ bgcolor: randomColorPicker() }}
              alt={userProfile.firstName + " " + userProfile.lastName}
              src={userProfile.avatarURL || ""}
            >
              {userProfile.firstName.charAt(0) + userProfile.lastName.charAt(0)}
            </Avatar>
            <div className="profile-modal__title-content">
              <div className="profile-modal__name">
                {userProfile.displayName}
              </div>
              <div className="profile-modal__email">{userProfile.email}</div>
            </div>
          </div>
          <div className="profile-modal__content">
            <div className="profile-modal__content__program">
              {userProfile.program?.name + " "+ String(userProfile.classYear)}
            </div>
            <div className="profile-modal__content__bio">
              <span>About Me:</span>
              <span>{userProfile.bio}</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileModal;
