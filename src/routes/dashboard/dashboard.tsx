import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import * as actions from "../../store/actionCreators";
import * as enums from "../../enums";
import { Button } from "@mui/material";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useAuth0 } from "@auth0/auth0-react";
import {
  PlayCircleOutline as PlayCircleOutlineIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import {
  LoadingScreen,
  DoubleConfirmButton,
  Footprints,
} from "../../common/components";
import "./dashboard.scss";
import TeamPage from "./teamPage";

// const defaultProfile = require("../../assets/profile.png");
// const gooseSearching = require("../../assets/dashboard/goose-searching.png");
// const gooseMeeting = require("../../assets/dashboard/goose-meeting.png");
// const gooseOpenDoor = require("../../assets/dashboard/goose-opendoor.png");
// const gooseSleeping = require("../../assets/dashboard/goose-sleeping.png");
// const gooseVerification = require("../../assets/dashboard/goose-verification.png");
// const gooseWaiting = require("../../assets/dashboard/goose-waiting.png");

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

  const renderNothing = () => {
    return (
      <div className="dashboard__nothing dashboard__standard-content-wrapper">
        <div className="dashboard__nothing__content dashboard__standard-content">
          <span>
            Our matching algorithm is taking a break, please check back later.
          </span>
        </div>
      </div>
    );
  };

  const renderJoinable = () => {
    return (
      <div className="dashboard__joinable dashboard__standard-content-wrapper">
        <div className="dashboard__joinable__content dashboard__standard-content">
          <span>
            Matching is open! Our Algorithm will soon be creating FYDP teams.
          </span>
          <Button
            className="actionButton"
            color="inherit"
            variant="outlined"
            onClick={onJoinMatchRound}
          >
            <PlayCircleOutlineIcon />
            Enter Now
          </Button>
        </div>
      </div>
    );
  };

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

  const renderUpcoming = () => {
    return (
      <div className="dashboard__upcoming dashboard__standard-content-wrapper">
        <div className="dashboard__upcoming__content dashboard__standard-content">
          <span>New match rounds will open soon</span>
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
    console.log("userMatchRound", userMatchRound);
    return (
      <div className="dashboard__leavable dashboard__standard-content-wrapper">
        <div className="dashboard__leavable__content dashboard__standard-content">
          <div className="dashboard__countdown__wrapper">
            {userMatchRound?.nextStart && (
              <Countdown
                date={userMatchRound?.nextStart as Date}
                renderer={countdownRenderer}
              />
            )}
          </div>
          <span>
            Thanks for joining! Our algorithm will soon find your FYDP team.
          </span>
          <DoubleConfirmButton
            variant="outlined"
            className="actionButton"
            color="inherit"
            onClick={onLeaveMacthround}
            confirmDescription="We understand that sometimes life can get in the way of your plans, 
              and you may need to opt out of a team matching round. 
              Before you confirm your decision, please ensure that this is what you really want to do, 
              as we may not be able to include you in a future round."
          >
            <LogoutIcon />
            Opt Out
          </DoubleConfirmButton>
        </div>
      </div>
    );
  };

  const renderEmailVerificationRequired = () => {
    return (
      <div className="dashboard__nothing dashboard__standard-content-wrapper">
        <div className="dashboard__nothing__content dashboard__standard-content">
          <span>Check your mailbox for a verification email!</span>
        </div>
      </div>
    );
  };

  const renderWaiting = () => {
    return (
      <div className="dashboard__waiting dashboard__standard-content-wrapper">
        <div className="dashboard__waiting__content dashboard__standard-content">
          <span>
            Please wait while our algorithm emulates all alternate futures to
            compute the optimal outcome. You will soon be matched with a team.
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <LoadingScreen isLoading={isLoading} />
      <Footprints />
      <div className="dashboard__content-container">
        {config === DashboardConfig.AccessDenied &&
          renderEmailVerificationRequired()}
        {config === DashboardConfig.Nothing && renderNothing()}
        {config === DashboardConfig.Upcoming && renderUpcoming()}
        {config === DashboardConfig.Joinable && renderJoinable()}
        {config === DashboardConfig.Leavable && renderLeavable()}
        {config === DashboardConfig.Waiting && renderWaiting()}
        {config === DashboardConfig.Teaming && <TeamPage />}
      </div>
    </div>
  );
};
export default Dashboard;
