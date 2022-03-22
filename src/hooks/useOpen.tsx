import { useState } from "react";

export const useOpen = (isDefaultOpen = false) => {
  const [open, setOpen] = useState(isDefaultOpen);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const switchOpen = () => {
    setOpen(!open);
  };

  return { open, handleClose, handleOpen, switchOpen };
};
