import React, { FunctionComponent } from "react";
import _ from "lodash";
import { Modal, Divider, Button } from "@mui/material";
import {
  Close as CloseIcon,
  QuestionMark as QuestionMarkIcon,
} from "@mui/icons-material";
import "./TeamOptionsModal.scss";

interface Props {
  onLeaveTeam: () => void;
  onStayTeam: () => void;
  isOpen: boolean;
  onCloseModal: () => void;
}

const TeamOptionsModal: FunctionComponent<Props> = (props) => {
  const { onLeaveTeam, onStayTeam, isOpen, onCloseModal } = props;

  const renderChoiceContent = () => {
    return (
      <div className="team-options-modal__choice-container">
        <div className="team-options-modal__leave-choice-block">
          <Button variant="contained" size="large" onClick={onLeaveTeam}>
            Leave
          </Button>
        </div>
        <Divider>OR</Divider>
        <div className="team-options-modal__stay-choice-block">
          <Button variant="contained" size="large" onClick={onStayTeam}>
            Commit
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="team-options-modal__team-options-modal-wrapper">
      <Modal open={isOpen} onClose={onCloseModal}>
        <div className="team-options-modal__content-container">
          <div className="team-options-modal__close-button-container">
            <div
              className="team-options-modal__close-button"
              onClick={onCloseModal}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="team-options-modal__title-container">
            <QuestionMarkIcon />
            <span>
              Your Choice: Would you commit to the team or abandon it?{" "}
            </span>
          </div>
          {renderChoiceContent()}
        </div>
      </Modal>
    </div>
  );
};

export default TeamOptionsModal;
