import { ReactNode } from "react";
import { IconButton, Modal, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CloseIcon from "@mui/icons-material/Close";
import { Loading } from "@/components/Loading";

const useStyles = makeStyles<Theme>((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 700,
    margin: "0 auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[20],
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    paddingTop: theme.spacing(6),
    position: "relative",
  },
}));

type Props = {
  handleClose: () => void;
  open: boolean;
  children: ReactNode;
  error?: Error | null;
};

export default function ModalContainer({
  handleClose,
  open,
  children,
  error,
}: Props) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal"
    >
      <div className={classes.paper}>
        <IconButton
          aria-label="close modal"
          onClick={handleClose}
          sx={{ position: "absolute", top: 15, right: 15 }}
        >
          <CloseIcon />
        </IconButton>
        {!error ? children : <Loading error={error} isError />}
      </div>
    </Modal>
  );
}
