import React, { FunctionComponent, useEffect, useState } from "react";
import _ from "lodash";
import { Modal, Avatar, IconButton, Button } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { randomColorPicker } from "../styles/theme";
import "./ProfileModal.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAllSillsetsStartAction,
  getAnotherUserSkillsetsStartAction,
  getCurrentUserSkillsetsStartAction,
} from "../../store/actionCreators";
import { motion, AnimatePresence } from "framer-motion";
import useUserProfile from "../hooks/useUserProfile";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import usePrevious from "../hooks/usePrevProps";

interface Props {
  userProfile: UserProfile;
  isOpen: boolean;
  onCloseModal: () => void;
}

const ProfileModal: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const { userId } = useUserProfile();
  const { userProfile, isOpen, onCloseModal } = props;
  const allSkillsets = useSelector(
    (state: AppState) => state.onboardingConfiguration.skillsets
  );
  const userSkillsets: UserSkillset[] | undefined = useSelector(
    (state: AppState) => state.otherUserSkillsets[userProfile.id]
  );
  const mySkillsets: UserSkillset[] | undefined = useSelector(
    (state: AppState) => state.currentUser?.skillsets
  );

  const isFetchingOtherUser = useSelector(
    (state: AppState) => state.isFetchingOtherUser
  );

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const prevIndex = usePrevious<Number>(currentSkillIndex);

  useEffect(() => {
    if (Object.entries(allSkillsets).length == 0 || !allSkillsets) {
      dispatch(getAllSillsetsStartAction());
    }
    if (!mySkillsets || Object.entries(mySkillsets).length == 0) {
      dispatch(getCurrentUserSkillsetsStartAction(userId!));
    }
    dispatch(getAnotherUserSkillsetsStartAction(userProfile.id));
  }, []);

  const renderSkill = (teammateSkill: UserSkillset) => {
    const mySkill = mySkillsets
      ? mySkillsets.find((s) => s.attributeId === teammateSkill.attributeId)
      : null;
    const diff = Math.abs(
      Number(teammateSkill.data ?? 0) - Number(mySkill?.data ?? 0)
    );
    return (
      <motion.div
        initial={{ x: prevIndex > currentSkillIndex ? -300 : 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: prevIndex > currentSkillIndex ? 300 : -300, opacity: 0 }}
        key={teammateSkill.attributeId}
        className="profile-modal__skills__section"
      >
        <div className="profile-modal__skills__section__title">
          {allSkillsets[teammateSkill.attributeId]?.name ?? "Something"}
        </div>
        <div className="profile-modal__skills__section__description">
          {diff === 0
            ? "it is fate that brought you together"
            : diff <= 3
            ? "fairly close, our algorithm works :)"
            : "your differences will complement each other"}
        </div>
        <div className="profile-modal__skills__section__rating">
          <div className="profile-modal__skills__section__rating__box">
            <div className="profile-modal__skills__section__rating__name">
              Teammate
            </div>
            <div className="profile-modal__skills__section__rating__value">
              {teammateSkill.data}
            </div>
          </div>
          <div className="profile-modal__skills__section__rating__box">
            <div className="profile-modal__skills__section__rating__name">
              You
            </div>
            <div className="profile-modal__skills__section__rating__value">
              {mySkill?.data ?? "?"}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="profile-modal__profile-modal-wrapper">
      <Modal open={isOpen} onClose={onCloseModal}>
        <div className="profile-modal__content-container">
          <div className="profile-modal__close-button-container">
            <div className="profile-modal__close-button" onClick={onCloseModal}>
              <CloseIcon />
            </div>
          </div>
          <div>
            <div className="profile-modal__avatar-wrapper">
              <Avatar
                sx={{ bgcolor: randomColorPicker(String(userProfile.id)) }}
                alt={userProfile.firstName + " " + userProfile.lastName}
                src={userProfile.avatarURL || ""}
              >
                {userProfile.firstName.charAt(0) +
                  userProfile.lastName.charAt(0)}
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
                {userProfile.program?.name +
                  " " +
                  String(userProfile.classYear)}
              </div>
              <div className="profile-modal__content__bio">
                <span>About Me:</span>
                <span>{userProfile.bio}</span>
              </div>
            </div>
          </div>
          {userId !== userProfile.id ? (
            <div className="profile-modal__skills">
              <AnimatePresence>
                {userSkillsets && renderSkill(userSkillsets[currentSkillIndex])}
              </AnimatePresence>
              <IconButton
                className="nav-left-button"
                edge="start"
                color="inherit"
                onClick={() =>
                  setCurrentSkillIndex((i) =>
                    i > 0 ? i - 1 : Math.max(0, userSkillsets.length - 1)
                  )
                }
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                className="nav-right-button"
                edge="start"
                color="inherit"
                onClick={() =>
                  setCurrentSkillIndex((i) =>
                    i < userSkillsets.length - 1 ? i + 1 : 0
                  )
                }
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          ) : (
            <div className="random-message-wrapper">
              <div className="random-message">hey, it's you</div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ProfileModal;
