import { Button, Avatar, IconButton } from "@mui/material";
import {
  motion,
  AnimatePresence,
  Variants,
  MotionProps,
  useAnimationControls,
} from "framer-motion";
import * as actions from "../../store/actionCreators";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { randomColorPicker } from "../../common/styles/theme";
import useUserProfile from "../../common/hooks/useUserProfile";
import * as enums from "../../enums";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  DoubleConfirmButton,
  ProfileModal,
  TeamOptionsModal,
} from "../../common/components";
import TeamChat from "./teamChat";
import "./teamPage.scss";
import cookies from "../../cookies";
import { GroupCommitmentOptions } from "../../enums";
import CongradulationModal from "../../common/components/CongradulationModal";
import { isNil } from "lodash";

const profileVariants: Variants = {
  static: { translateY: 0 },
  active: {
    translateY: [null, -6, 0],
    transition: {
      duration: 0.3,
      bounce: 0.5,
      type: "spring",
    },
  },
};

const staggeredContainerVariants: Variants = {
  static: {},
  active: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const TeamPage = () => {
  const dispatch = useDispatch();
  const profileControl = useAnimationControls();

  const userGroup: Group | null = useSelector(
    (state: AppState) => state.currentUser?.group as Group | null
  );

  const { userProfile } = useUserProfile();

  const [focusedTeamM, setFocusedTeamM] = useState(null as UserProfile | null);
  const [isMemberProfileOpen, setIsMemberProfileOpen] = useState(false);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [isCongradulation, setIsCongradulation] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDecisionOpen, setIsDecisionOpen] = useState(false);
  const [prevDecision, setPrevDecision] = useState(
    GroupCommitmentOptions.Undecided
  );
  const groupId = userGroup?.id;

  // TODO: missing actual logic in backend!
  useEffect(() => {
    if (groupId) {
      const choice = cookies.get("commitment-" + groupId);
      console.log("choosed", choice);
      if (choice && Number(choice) !== GroupCommitmentOptions.Undecided) {
        setPrevDecision(Number(choice));
      }
    }
  }, [groupId]);

  useEffect(() => {
    if (groupId) {
      const congrat = cookies.get("congradulation-" + groupId);
      console.log(congrat)
      if (isNil(congrat) || Number(congrat) === 0) {
        setIsCongradulation(true);
      }
    }
  }, [])

  useEffect(() => {
    if (isCongradulation) {
      dispatch(actions.getSetReducedFootprintAction(100));
    } else {
      dispatch(actions.getSetReducedFootprintAction(0));
    }
  }, [isCongradulation]);

  useEffect(() => {
    if (isChatOpen) {
      dispatch(actions.getSetReducedFootprintAction(1));
    } else {
      dispatch(actions.getSetReducedFootprintAction(0));
    }
  }, [isChatOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      profileControl.start("active");
    }, 5000);
    return () => clearInterval(interval);
  }, [profileControl]);

  const onOpenMemberProfile = (member: UserProfile) => {
    setFocusedTeamM(member);
    setIsMemberProfileOpen(true);
  };
  const onCloseMemberProfile = () => {
    setIsMemberProfileOpen(false);
  };
  const onOpenChoiceModal = () => {
    setIsChoiceModalOpen(true);
  };
  const onCloseChoiceModal = () => {
    setIsChoiceModalOpen(false);
  };

  const onUpdateGroupCommitment = (commit: boolean) => {
    setIsChoiceModalOpen(false);
    setPrevDecision(
      commit ? GroupCommitmentOptions.Commit : GroupCommitmentOptions.Leave
    );
    dispatch(
      actions.getUpdateGroupCommitmentStartAction(
        userProfile!.id,
        userGroup?.id as number,
        commit
          ? enums.GroupCommitmentOptions.Commit
          : enums.GroupCommitmentOptions.Leave,
        "N/A"
      )
    );
  };

  return (
    <React.Fragment>
      {isCongradulation && (
        <CongradulationModal
          isOpen={isCongradulation}
          onCloseModal={() => setIsCongradulation(false)}
          groupId={groupId ?? -1}
        />
      )}
      {isMemberProfileOpen && (
        <ProfileModal
          isOpen={isMemberProfileOpen}
          onCloseModal={onCloseMemberProfile}
          userProfile={focusedTeamM as UserProfile}
        />
      )}
      {isChoiceModalOpen && (
        <TeamOptionsModal
          isOpen={isChoiceModalOpen}
          onCloseModal={onCloseChoiceModal}
          onLeaveTeam={() => onUpdateGroupCommitment(false)}
          onStayTeam={() => onUpdateGroupCommitment(true)}
        />
      )}
      <div className="team-page">
        <motion.div
          animate={{ scaleY: isChatOpen ? 1 : 0 }}
          transition={{ bounce: 0 }}
          style={{ transformOrigin: "top" }}
          className="team-page__team-chat-wrapper"
        >
          <TeamChat />
        </motion.div>
        <div
          className={classNames({
            dashboard__teaming: true,
            "dashboard__standard-content-wrapper": true,
            "chat-active": isChatOpen,
            "decision-open": isDecisionOpen,
          })}
        >
          <motion.div
            animate={{
              height: isChatOpen
                ? "calc(100% - 60vh - 52px - 12px)"
                : isDecisionOpen
                ? 500
                : 250,
              y: isChatOpen ? 0 : isDecisionOpen ? 50 : 100,
            }}
            transition={{ bounce: 0 }}
            className="dashboard__teaming__content dashboard__standard-content"
          >
            <div className="dashboard__teaming__content__prompt-primary">
              Team {userGroup?.name}
            </div>
            <motion.div
              variants={staggeredContainerVariants}
              animate={profileControl}
              className="dashboard__teaming__content__teams-container"
            >
              {userGroup?.members.map((member) => {
                return (
                  <motion.div
                    variants={profileVariants}
                    className="dashboard__teaming__content__avatar-wrapper"
                    key={member.id}
                    onClick={() => onOpenMemberProfile(member)}
                  >
                    <Avatar
                      sx={{ bgcolor: randomColorPicker(String(member.id)) }}
                      alt={member.firstName + " " + member.lastName}
                      src={member.avatarURL || ""}
                    >
                      {member.firstName.charAt(0) + member.lastName.charAt(0)}
                    </Avatar>
                  </motion.div>
                );
              })}
            </motion.div>
            <AnimatePresence>
              {!isChatOpen && (
                <motion.div
                  key="say-hi-button-wrapper"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Button
                    variant="outlined"
                    className="actionButton open-chat-button"
                    color="inherit"
                    onClick={() => {
                      setIsDecisionOpen(false);
                      setIsChatOpen((o) => !o);
                    }}
                  >
                    Say 👋 to your team!
                  </Button>
                </motion.div>
              )}
              {!isChatOpen && (
                <motion.div
                  key="close-chat-button-wrapper"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <IconButton
                    className="open-decision-button"
                    size="small"
                    edge="start"
                    color="inherit"
                    onClick={() => setIsDecisionOpen((o) => !o)}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </motion.div>
              )}
              {isChatOpen && (
                <motion.div
                  key="close-chat-button-wrapper"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <IconButton
                    className="close-chat-button"
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={() => setIsChatOpen((o) => !o)}
                  >
                    <ExpandLessIcon />
                  </IconButton>
                </motion.div>
              )}
              {isDecisionOpen && (
                <motion.div
                  key="decision-wrapper"
                  className="decision-wrapper"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="decision-title">Your choice</div>
                  <div className="decision-description">
                    Now that you've had a chance to chat with your potential
                    team members, we encourage you to consider whether you want
                    to commit to the team or leave it. Building a successful
                    team takes time and effort, and it's important that all team
                    members are fully committed to the project.
                  </div>
                  {prevDecision === GroupCommitmentOptions.Undecided && (
                    <div className="decision-buttons-wrapper">
                      <DoubleConfirmButton
                        className="actionButton actionButton-leave"
                        variant="outlined"
                        onClick={() => onUpdateGroupCommitment(false)}
                        confirmDescription="We get it, sometimes things just don't click. 
                        If you've decided that your potential team members aren't the right fit for you, 
                        that's okay. We won't judge - we understand that not everyone can be a superstar at the project. 
                        Simply let us know by confirming your decision to leave the team. 
                        We'll assume that the decision has nothing to do with their lack of skills or 
                        the fact that they don't want to contribute, and that it's just one of those things. 
                        We'll help you find another team that you click with better. Good luck!"
                        confirmAction="🚗💨&nbsp;Let me out"
                      >
                        Leave
                      </DoubleConfirmButton>
                      <DoubleConfirmButton
                        className="actionButton actionButton-commit"
                        variant="outlined"
                        onClick={() => onUpdateGroupCommitment(true)}
                        confirmDescription="We hope you had a chance to chat with your potential team members 
                        and didn't find anyone too unbearable (fingers crossed). 
                        If you're ready to commit to the team and start working on your project, 
                        simply let us know by confirming your decision. We'll assume you're okay 
                        with dealing with any bad jokes or questionable problem solving abilities 
                        (we can't guarantee the latter won't affect your project outcome). 
                        But hey, that's all part of the team-building process, right?"
                        confirmAction="😣&nbsp;Ready to Suffer"
                      >
                        Commit
                      </DoubleConfirmButton>
                    </div>
                  )}
                  {prevDecision !== GroupCommitmentOptions.Undecided && (
                    <div className="decision-final-decision">
                      {prevDecision === GroupCommitmentOptions.Commit
                        ? "You choosed to commit"
                        : "This should not be shown"}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamPage;
