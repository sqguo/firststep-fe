import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import _, { random, range } from "lodash";
import { Modal, Button } from "@mui/material";
import "./CongradulationModal.scss";
import cookies from "../../cookies";
import classNames from "classnames";
import { motion } from "framer-motion";
import { randomColorPicker } from "../styles/theme";
import Clipcart from "../../assets/flying-goose.svg";

const ART_HEIGHT = 60;
const ART_HEIGHT_PADDING = 5;
const ART_WIDTH = 100;
const ART_WIDTH_PADDING = 20;
const TOP_OFFSET = 110;

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  groupId: number;
}

const CongradulationModal: FunctionComponent<Props> = (props) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen, onCloseModal, groupId } = props;

  const num_y = Math.round(height / (ART_HEIGHT + ART_HEIGHT_PADDING));
  const num_x = 1;
  console.log(num_y, num_x);

  useEffect(() => {
    setHeight(window.screen.height ?? 0);
    setWidth(window.screen.width ?? 0);
  }, [containerRef]);

  console.log(width, height);

  useEffect(() => {
    cookies.set("congradulation-" + groupId, 1, { path: "/" });
  }, []);
  const mcguffin = (Math.abs(0 - Math.floor(num_y / 2)) + 1) * ART_WIDTH;

  return (
    <>
      <div className="congradulation-modal__congradulation-modal-wrapper">
        <Modal
          open={isOpen}
          onClose={onCloseModal}
          BackdropProps={{
            sx: { backgroundColor: "rgb(0 0 0 / 75%)", zIndex: 1000 },
          }}
        >
          <>
            <div className="congradulation-modal__animation-wrapper">
              {range(num_y).map((i) => {
                const init_y =
                  i * (ART_HEIGHT + ART_HEIGHT_PADDING) - TOP_OFFSET;
                const flip = i % 5 < 3;
                const delay_y = Math.abs(i - Math.floor(num_y / 2)) + 1;
                return range(num_x).map((j) => {
                  const init_x = j * (ART_WIDTH + ART_WIDTH_PADDING);
                  return (
                    <motion.div
                      className="flying-goose-wrapper"
                      animate={{
                        x: flip
                          ? [width + ART_WIDTH, 0 - ART_WIDTH]
                          : [0 - ART_WIDTH, width + ART_WIDTH],
                        y: [init_y, init_y],
                      }}
                      style={{ scaleX: flip ? 1 : -1 }}
                      transition={{
                        delay: random(0, 2, true),
                        duration: random(3.8, 4.2, true),
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: random(0, 0.5, true)
                      }}
                    >
                      <Clipcart
                        className={classNames({
                          "flying-goose": true,
                          ["flying-goose-" + randomColorPicker().substring(1)]:
                            true,
                        })}
                        style={{ fill: randomColorPicker() }}
                      />
                    </motion.div>
                  );
                });
              })}
            </div>
            <div className="congradulation-modal__content-container">
              <div className="congradulation-modal__title">Congratulations!</div>
              <div className="congradulation-modal__title">
                You have been matched with a team.
              </div>
              <div className="congradulation-modal__description">
                Take your time to chat with your team members and learn more
                about their interests by clicking on their profiles. Once you
                feel comfortable making a decision, head to the options page to
                make your decision permanent.
              </div>
              <div className="congradulation-modal__button">
                <Button
                  className="actionButton"
                  variant="outlined"
                  color="inherit"
                  onClick={onCloseModal}
                >
                  🎉&nbsp;hooray
                </Button>
              </div>
            </div>
          </>
        </Modal>
      </div>
    </>
  );
};

export default CongradulationModal;
