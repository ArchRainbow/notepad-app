import { Dispatch, SetStateAction } from "react";
import "./alert.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AlertData } from "../../models/types.model";

type Prop = {
  items: AlertData;
  setOpenAlert: Dispatch<SetStateAction<boolean>>;
};
const textTypes = [
  {
    title: "It's empty!",
    content: "If you proceed, the note will be deleted.",
  },
  {
    title: "The nameless",
    content: "The note is missing its title. Save anyway?",
  },
  {
    title: "It's... lacking",
    content:
      "The note is missing some content. Are you sure you want to save as is?",
  },
  {
    title: "Wait!",
    content: "This cannot be undone.",
  },
  {
    title: "Are you sure?",
    content: "The changes made will be discarded.",
  },
  {
    title: "Hold up!",
    content: "If you continue, the note will be deleted.",
  },
];

const Alert = ({ setOpenAlert, items }: Prop) => {
  const { alertType, onProceedAction } = items;

  const handleButton = () => {
    setOpenAlert(false);

    onProceedAction();
  };

  return (
    <Dialog open className="alert__container">
      <DialogTitle>{textTypes[alertType].title}</DialogTitle>
      <DialogContent>{textTypes[alertType].content}</DialogContent>
      <DialogActions>
        <Button size="large" color="error" onClick={() => setOpenAlert(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => handleButton()}>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
