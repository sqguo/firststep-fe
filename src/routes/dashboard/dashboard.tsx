import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import * as actions from "../../store/actionCreators";
import * as enums from "../../enums";
import { Button, Avatar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useAuth0 } from "@auth0/auth0-react";

import theme, { randomColorPicker } from "../../common/styles/theme";
import {
  LoadingScreen,
  TeamOptionsModal,
  ProfileModal,
} from "../../common/components";
import "./dashboard.scss";

const defaultProfile = require("../../assets/profile.png");

interface Props {}
export enum DashboardConfig {
  AccessDenied,
  Nothing,
  Upcoming,
  Joinable,
  Leavable,
  Waiting,
  Teaming,
}

const Dashboard: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const isUserVerified = !!user?.email_verified;

  const userProfile: UserProfile = useSelector(
    (state: AppState) => state.currentUser?.profile as UserProfile
  );
  const userGroup: Group | null = useSelector(
    (state: AppState) => state.currentUser?.group as Group | null
  );
  const userHasGroup: boolean = useSelector(
    (state: AppState) => state.currentUser?.hasGroup as boolean
  );
  const isLoading = useSelector(
    (state: AppState) =>
      state.isLoadingUserGroup ||
      state.isLoadingGroupMemberProfile ||
      state.isLoadingMatchrounds ||
      state.isJoiningMatchRound ||
      state.isLeavingMatchRound ||
      state.isUpdatingGroupCommitment
  );

  const userMatchRound: MatchRound | null = useSelector(
    (state: AppState) =>
      state.currentUser?.currentMatchround as MatchRound | null
  );
  const latestMatchRound: MatchRound | null = useSelector((state: AppState) => {
    const revOMs = Object.entries(state.currentMatchrounds).filter(
      (m) => m[1].currentStatus === enums.MatchRoundStatus.Open
    );
    const revUMs = Object.entries(state.currentMatchrounds).filter(
      (m) => m[1].currentStatus === enums.MatchRoundStatus.Upcoming
    );

    return revOMs.length > 0
      ? revOMs[0][1]
      : revUMs.length > 0
      ? revUMs[0][1]
      : null;
  });

  const config = !isUserVerified
    ? DashboardConfig.AccessDenied
    : userHasGroup && userGroup
    ? DashboardConfig.Teaming
    : userMatchRound &&
      userMatchRound.currentStatus == enums.MatchRoundStatus.Open
    ? DashboardConfig.Leavable
    : userMatchRound
    ? DashboardConfig.Waiting
    : latestMatchRound &&
      latestMatchRound.currentStatus == enums.MatchRoundStatus.Open
    ? DashboardConfig.Joinable
    : latestMatchRound &&
      latestMatchRound.currentStatus == enums.MatchRoundStatus.Upcoming
    ? DashboardConfig.Upcoming
    : DashboardConfig.Nothing;

  const [focusedTeamM, setFocusedTeamM] = useState(null as UserProfile | null);
  const [isMemberProfileOpen, setIsMemberProfileOpen] = useState(false);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);

  useEffect(() => {
    dispatch(actions.getCurrentUserStartAction(userProfile.email));
    dispatch(actions.getGroupProfileStartAction(userProfile.id));
    dispatch(actions.getGlobalMatchingStatusStartAction());
  }, []);

  const onJoinMatchRound = () => {
    dispatch(
      actions.getJoinMatchroundStartAction(
        userProfile.id,
        latestMatchRound?.id as number
      )
    );
  };

  const onLeaveMacthround = () => {
    dispatch(
      actions.getLeaveMatchroundStartAction(
        userProfile.id,
        latestMatchRound?.id as number
      )
    );
  };

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
        userProfile.id,
        userGroup?.id as number,
        commit
          ? enums.GroupCommitmentOptions.Commit
          : enums.GroupCommitmentOptions.Leave,
        "N/A"
      )
    );
  };

  const renderNothing = () => {
    return (
      <div className="dashboard__nothing dashboard dashboard__standard-content-wrapper">
        <div className="dashboard__nothing__content dashboard__standard-content">
          <span>
            Our matching algorithm is taking a break, please check back later
          </span>
        </div>
      </div>
    );
  };

  const renderJoinable = () => {
    return (
      <div className="dashboard__joinable dashboard dashboard__standard-content-wrapper">
        <div className="dashboard__joinable__content dashboard__standard-content">
          <span>
            Matching is open! Our Algoirthm will soon be creating FYDP teams
          </span>
          <Button variant="outlined" onClick={onJoinMatchRound}>
            Enter Now
          </Button>
        </div>
      </div>
    );
  };

  const renderUpcoming = () => {
    const countdownRenderer = ({
      days,
      hours,
      minutes,
      seconds,
    }: CountdownRenderProps) => {
      const dayformatted = days >= 10 ? String(days) : "0" + String(days);
      const hourformatted = hours >= 10 ? String(hours) : "0" + String(hours);
      const minuteformatted =
        minutes >= 10 ? String(minutes) : "0" + String(minutes);
      const secondformatted =
        seconds >= 10 ? String(seconds) : "0" + String(seconds);
      return (
        <span className="dashboard__countdown__content">
          {dayformatted}:{hourformatted}:{minuteformatted}:{secondformatted}
        </span>
      );
    };
    return (
      <div className="dashboard__upcoming dashboard dashboard__standard-content-wrapper">
        <div className="dashboard__upcoming__content dashboard__standard-content">
          <span>New matchrounds will open soon</span>
          <div className="dashboard__countdown__wrapper">
            {latestMatchRound?.nextStart && (
              <Countdown
                date={latestMatchRound?.nextStart as Date}
                renderer={countdownRenderer}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderLeavable = () => {
    return (
      <div className="dashboard__leavable dashboard dashboard__standard-content-wrapper">
        <div className="dashboard__leavable__content dashboard__standard-content">
          <span>
            Thanks for joining! Our algorithm will soon find your FYDP team.
          </span>
          <Button variant="outlined" onClick={onLeaveMacthround}>
            Opt Out
          </Button>
        </div>
      </div>
    );
  };

  const renderEmailVerificationRequired = () => {
    return (
      <div className="dashboard__nothing dashboard dashboard__standard-content-wrapper">
        <div className="dashboard__nothing__content dashboard__standard-content">
          <span>Check you mailbox for a verification email!</span>
        </div>
      </div>
    );
  };

  const renderWaiting = () => {
    return (
      <div className="dashboard__waiting dashboard dashboard__standard-content-wrapper">
        <div className="dashboard__waiting__content dashboard__standard-content">
          <span>
            Please wait while our algorithm emulates all alternate futures to
            compute the optimal outcome. You will soon be matched with a team.
          </span>
        </div>
      </div>
    );
  };

  const renderTeaming = () => {
    return (
      <div className="dashboard__teaming dashboard dashboard__standard-content-wrapper">
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
              const isCurrentUser = member.id === userProfile.id;
              return (
                <div
                  className="dashboard__teaming__content__avatar-wrapper"
                  key={member.id}
                  onClick={() => onOpenMemberProfile(member)}
                >
                  <Avatar
                    sx={{ bgcolor: randomColorPicker() }}
                    alt={member.firstName + " " + member.lastName}
                    src={
                      member.avatarURL || (isCurrentUser ? defaultProfile : "")
                    }
                  >
                    {member.firstName.charAt(0) + member.lastName.charAt(0)}
                  </Avatar>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <LoadingScreen isLoading={isLoading} />
      <ThemeProvider theme={theme}>
        <div className="dashboard__content-container">
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
          {config === DashboardConfig.AccessDenied &&
            renderEmailVerificationRequired()}
          {config === DashboardConfig.Nothing && renderNothing()}
          {config === DashboardConfig.Upcoming && renderUpcoming()}
          {config === DashboardConfig.Joinable && renderJoinable()}
          {config === DashboardConfig.Leavable && renderLeavable()}
          {config === DashboardConfig.Waiting && renderWaiting()}
          {config === DashboardConfig.Teaming && renderTeaming()}
        </div>
      </ThemeProvider>
    </div>
  );
};
export default Dashboard;
