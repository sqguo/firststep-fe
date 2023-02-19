import React, { useState } from "react";
import { Modal, Button, ButtonProps } from "@mui/material";
import "./DoubleConfirmButton.scss";
import { AnimatePresence, motion, MotionProps } from "framer-motion";

const clipcart = require("../../assets/goose-clipart.png");

const item = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1 },
};

const staggeredContainerProps: MotionProps = {
  variants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  },
  initial: "hidden",
  animate: "show",
  exit: "hidden",
};

interface DoubleConfirmButtonProps extends ButtonProps {
  confirmTitle?: string;
  confirmDescription?: string;
  confirmAction?: string;
  onClick: () => void;
}

const DoubleConfirmButton = (props: DoubleConfirmButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    confirmTitle,
    confirmDescription,
    confirmAction,
    onClick,
    children,
    ...rest
  } = props;

  const onStartAction = () => {
    setIsModalOpen(true);
  };

  const onConfirmAction = () => {
    setIsModalOpen(false);
    onClick();
  };

  const onCancelAction = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <Modal open={isModalOpen}>
        <div className="double-confirm__modal__outer-wrapper">
          <AnimatePresence>
            <motion.div {...staggeredContainerProps}>
              <motion.div
                variants={item}
                className="double-confirm__modal__content-container"
              >
                <div className="double-confirm__modal__title">
                  {confirmTitle ?? "Hissst, are you sure?"}
                </div>
                {confirmDescription && (
                  <div className="double-confirm__modal__description">
                    {confirmDescription}
                  </div>
                )}
                <div className="double-confirm__modal__buttons-row">
                  <Button
                    variant="outlined"
                    className="actionButton actionButton-cancel"
                    color="inherit"
                    onClick={onCancelAction}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    className="actionButton actionButton-danger"
                    color="inherit"
                    onClick={onConfirmAction}
                  >
                    {confirmAction ?? "Confirm"}
                  </Button>
                </div>
              </motion.div>
              <div className="double-confirm__modal__clipart">
                <motion.div
                  variants={item}
                  className="double-confirm__modal__clipart__box1-wrapper"
                >
                  <div className="double-confirm__modal__clipart__box1"></div>
                </motion.div>
                <motion.div
                  variants={item}
                  className="double-confirm__modal__clipart__box2-wrapper"
                >
                  <div className="double-confirm__modal__clipart__box2"></div>
                </motion.div>
                <motion.div
                  variants={item}
                  className="double-confirm__modal__clipart__art"
                >
                  <img src={clipcart} />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Modal>
      <Button onClick={onStartAction} {...rest}>
        {children}
      </Button>
    </React.Fragment>
  );
};

export default DoubleConfirmButton;
