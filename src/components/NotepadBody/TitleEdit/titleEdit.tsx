import './titleEdit.css'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  title: string;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
};

function TitleEdit({ title, setOpenDialog, setTitle }: Props) {
  const [titleEdit, setTitleEdit] = useState("");

  const handleSave = () => {
    setOpenDialog(false);
    setTitle(titleEdit);
  };

  return (
    <Dialog open className="edit__container">
      <DialogTitle>Edit title</DialogTitle>
      <DialogContent>
        <Input
          defaultValue={title}
          onChange={(event) => setTitleEdit(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button size="large" color="error" onClick={() => setOpenDialog(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TitleEdit;
