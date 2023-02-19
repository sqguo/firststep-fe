import { Button, Avatar } from "@mui/material";
import * as actions from "../../store/actionCreators";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { randomColorPicker } from "../../common/styles/theme";
import useUserProfile from "../../common/hooks/useUserProfile";
import * as enums from "../../enums";
import { useDispatch } from "react-redux";
import { ProfileModal, TeamOptionsModal } from "../../common/components";

const TeamPage = () => {
  const dispatch = useDispatch();
  const userGroup: Group | null = useSelector(
    (state: AppState) => state.currentUser?.group as Group | null
  );

  const { userProfile } = useUserProfile();

  const [focusedTeamM, setFocusedTeamM] = useState(null as UserProfile | null);
  const [isMemberProfileOpen, setIsMemberProfileOpen] = useState(false);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);

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
      <div className="dashboard__teaming dashboard__standard-content-wrapper">
        <div className="dashboard__teaming__content dashboard__standard-content">
          <div className="dashboard__teaming__content__prompt-primary">
            Team {userGroup?.name}
          </div>
          <div className="dashboard__teaming__content__prompt-secondary">
            Say hi to your fellow members!{" "}
            <Button onClick={onOpenChoiceModal}>What's next</Button>
          </div>
          <div className="dashboard__teaming__content__teams-container">
            {userGroup?.members.map((member) => {
              return (
                <div
                  className="dashboard__teaming__content__avatar-wrapper"
                  key={member.id}
                  onClick={() => onOpenMemberProfile(member)}
                >
                  <Avatar
                    sx={{ bgcolor: randomColorPicker() }}
                    alt={member.firstName + " " + member.lastName}
                    src={member.avatarURL || ""}
                  >
                    {member.firstName.charAt(0) + member.lastName.charAt(0)}
                  </Avatar>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamPage;
