import React, { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Footprints.scss";
import { AnimatePresence, motion, MotionProps, Variants } from "framer-motion";
import FootprintIcon from "../../assets/footprint.svg";
import { filter, random, range } from "lodash";
import classNames from "classnames";
import { useSelector } from "react-redux";

const PRINT_RADIUS = 10;
const STEP_SIZE = 50;
const STEP_WIDTH = 20;
const SPAWN_FREQUENCY = 10000;
const VISIBLE_DURATION = 12;
const ENTRY_DURATION = 0.3;
const EXIT_DURATION = 6;
const STAGGERED_DURATION = 1;
const TOTAL_DURATION = ENTRY_DURATION + EXIT_DURATION + VISIBLE_DURATION;

interface Print {
  x: number;
  y: number;
  r: number;
  flip: boolean;
}

interface Track {
  prints: Print[];
  id: string;
}

const printVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0 } },
  show: {
    opacity: [null, 1, 1, 0],
    transition: {
      duration: TOTAL_DURATION,
      times: [
        0,
        ENTRY_DURATION / TOTAL_DURATION,
        (TOTAL_DURATION - EXIT_DURATION) / TOTAL_DURATION,
        1,
      ],
    },
  },
};

const staggeredContainerProps: MotionProps = {
  variants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: STAGGERED_DURATION,
      },
    },
  },
  initial: "hidden",
  animate: "show",
  exit: "hidden",
};

const toRadians = (angle: number) => {
  return angle * (Math.PI / 180);
};

const generateTrack = (
  x_max: number,
  y_max: number,
  x_init: number,
  y_init: number,
  r_init: number,
  flip_init: boolean
): Track => {
  const R_BASE = 8;
  const R_VAR = 10;
  const HYPER_LEN_THRESHOLD = 6;
  const HYPER_ADD_ON = 10;
  let r_dir = true;
  let x_cur = x_init;
  let y_cur = y_init;
  let r_cur = r_init;
  let flip_cur = flip_init;
  let hyper_enabled = true;
  let hyper_mode = false;
  let hyper_credits = 10;

  const prints: Print[] = [];
  prints.push({
    x: x_init,
    y: y_init,
    r: r_init,
    flip: flip_init,
  });
  while (true) {
    if (x_cur < 0 || y_cur < 0 || x_cur > x_max || y_cur > y_max) {
      break;
    }
    const x_diff = Math.cos(toRadians(r_cur)) * STEP_SIZE;
    const y_diff = Math.sin(toRadians(r_cur)) * STEP_SIZE;
    x_cur = x_cur + x_diff;
    y_cur = y_cur + y_diff;
    const flip_r_dir = random(3) === 1;
    r_dir = flip_r_dir && !hyper_mode ? !r_dir : r_dir;

    if (hyper_enabled && prints.length >= HYPER_LEN_THRESHOLD) {
      hyper_mode = random(10) === 1;
      hyper_enabled = false;
    }
    if (hyper_mode) {
      hyper_credits = hyper_credits - 1;
      if (hyper_credits <= 0) {
        hyper_mode = false;
      }
    }

    const r_diff = hyper_mode
      ? R_BASE + random(R_VAR) + HYPER_ADD_ON
      : R_BASE + random(R_VAR);
    r_cur = r_dir ? r_cur + r_diff : r_cur - r_diff;
    flip_cur = !flip_cur;

    prints.push({
      x: x_cur,
      y: y_cur,
      r: r_cur,
      flip: flip_cur,
    });
  }

  return {
    prints,
    id: uuidv4(),
  };
};

const generateInital = (x_max: number, y_max: number) => {
  const rand_flip = Boolean(random(1));
  const range = x_max + y_max * 2;
  const rand = random(range);
  let rand_x = 0;
  let rand_y = y_max;
  let rand_r = 45;
  if (rand < y_max) {
    rand_y = rand;
    rand_r = random(-45, 45);
  } else if (rand < y_max + x_max) {
    rand_x = rand - y_max;
    rand_r = random(-135, -45);
  } else {
    rand_y = rand - y_max - x_max;
    rand_x = x_max;
    rand_r = random(135, 225);
  }
  return { rand_x, rand_y, rand_r, rand_flip };
};

const generateGoodTrack = (x_max: number, y_max: number): Track | null => {
  const MIN_ACCEPTABLE_LENGTH = 10;
  for (let _ in range(20)) {
    const { rand_x, rand_y, rand_r, rand_flip } = generateInital(x_max, y_max);
    const track = generateTrack(
      x_max,
      y_max,
      rand_x,
      rand_y,
      rand_r,
      rand_flip
    );
    // don't end in header
    if (
      track.prints.length >= MIN_ACCEPTABLE_LENGTH &&
      track.prints[track.prints.length - 1].y > 0
    ) {
      return track;
    }
  }
  return null;
};

const Footprints = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  const reduceFootprint = useSelector(
    (state: AppState) => state.reducedFootprint
  );

  useEffect(() => {
    setHeight(containerRef.current?.offsetHeight ?? 0);
    setWidth(containerRef.current?.offsetWidth ?? 0);
  }, [containerRef]);

  useEffect(() => {
    const execute = () => {
      if (width > 0 && height > 0) {
        const track = generateGoodTrack(width, height);
        if (track) {
          setTracks((tracks) => [...tracks, track]);
        }
      }
    };
    execute();
    const interval = setInterval(() => {
      execute();
    }, SPAWN_FREQUENCY);
    return () => clearInterval(interval);
  }, [width, height]);

  const onTrackComplete = (rm_id: string) => {
    setTracks((tracks) => filter(tracks, (t) => t.id !== rm_id));
    console.log("removed", rm_id);
  };

  return (
    <div
      className={classNames({
        footprint: true,
        "footprint-reduced": reduceFootprint,
      })}
    >
      <div className="footprint__animation-wapper" ref={containerRef}>
        <AnimatePresence>
          {tracks.map((track) => (
            <motion.div
              {...staggeredContainerProps}
              key={track.id}
              className="footprint__track"
              onAnimationComplete={() => onTrackComplete(track.id)}
            >
              {track.prints.map((print, i) => (
                <motion.div
                  variants={printVariants}
                  key={track.id + "_" + i}
                  style={{
                    x: print.x,
                    y: print.y,
                    rotateZ: print.r + 90,
                  }}
                  className={classNames({
                    "footprint__print-wrapper": true,
                    "footprint__print-wrapper__flipped": print.flip,
                  })}
                >
                  <FootprintIcon
                    className={classNames({
                      footprint__print: true,
                      footprint__print__flipped: print.flip,
                    })}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Footprints;
