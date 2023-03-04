import React, { useEffect, useRef, useState } from "react";

function usePopoverHandler() {
  const [hoveredPopover, setHoveredPopover] = useState(false);
  const [hoveredPopoverButton, setHoveredPopoverButton] = useState(false);
  const hoveredPopoverRef = useRef(false);
  const hoveredPopoverButtonRef = useRef(false);
  const [openPopover, setOpenPopover] = useState(false);
  const openPopoverRef = useRef(true);
  const closePopoverDelayRef = useRef(false);

  useEffect(() => {
    openPopoverRef.current = openPopover;
  }, [openPopover]);

  useEffect(() => {
    hoveredPopoverRef.current = hoveredPopover;
    hoveredPopoverButtonRef.current = hoveredPopoverButton;
    if (hoveredPopover || hoveredPopoverButton) {
      closePopoverDelayRef.current = false;
      setOpenPopover(true);
    }
  }, [hoveredPopover, hoveredPopoverButton]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        !hoveredPopoverRef.current &&
        !hoveredPopoverButtonRef.current &&
        openPopoverRef.current
      ) {
        if (closePopoverDelayRef.current) {
          setOpenPopover(false);
        } else {
          closePopoverDelayRef.current = true;
        }
      }
    }, 200);
    return () => clearInterval(interval);
  }, [
    openPopoverRef,
    hoveredPopoverRef,
    hoveredPopoverButtonRef,
    setOpenPopover,
  ]);

  return {
    openPopover,
    setOpenPopover,
    setHoveredPopover,
    setHoveredPopoverButton,
  };
}

export default usePopoverHandler;
