import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { EditRounded, DeleteRounded, Save, Cancel } from "@mui/icons-material";
import { Input, Tooltip } from "@mui/material";
import "./listDetail.css";
import { useMediaQuery } from "../../hooks/use-media-query";
import mediaQueries from "../../utils/constants";
import Alert from "../Alert/alert";
import { AlertData, ListData } from "../../models/types.model";

type ListProps = {
  isEditable: boolean;
  noteDetail: Omit<ListData, "id">;
  onSaveHandler: (t: string, c: string) => void;
  deleteNote: () => void;
  setToEdit: Dispatch<SetStateAction<boolean>>;
  isCreateNew: boolean;
};

function ListDetail({
  isEditable,
  noteDetail,
  onSaveHandler,
  deleteNote,
  setToEdit,
  isCreateNew,
}: ListProps) {
  const { listName, content } = noteDetail;
  // aux title and contentEdit to edit
  const [title, setTitle] = useState("");
  const [contentEdit, setContentEdit] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const [alertItems, setAlertItems] = useState<AlertData>({
    alertType: -1,
    onProceedAction: () => {},
  });

  const isDesktop = useMediaQuery(mediaQueries.desktop);

  const onEdit = () => {
    setToEdit(true);
    // set aux with the originals to edit
    setTitle(listName);
    setContentEdit(content);
  };

  const onSaveClick = () => {
    // if the note is empty, it could be deleted
    if (title.length === 0 && contentEdit.length === 0) {
      setAlertItems({ alertType: 0, onProceedAction: deleteNote });
      setOpenAlert(true);
    }
    // check with user to make sure they know the note has no title/content
    else if (title.length === 0) {
      setAlertItems({ alertType: 1, onProceedAction: saveHandler });
      setOpenAlert(true);
    } else if (contentEdit.length === 0) {
      setAlertItems({ alertType: 2, onProceedAction: saveHandler });
      setOpenAlert(true);
    } else saveHandler();
  };

  const saveHandler = () => {
    setToEdit(false);

    // call saveHandler with aux, which may be edited or may be the originals
    onSaveHandler(title, contentEdit);

    setTitle("");
    setContentEdit("");
  };

  const onCancelClick = () => {
    if (isCreateNew) {
      onDeleteNote();
      setToEdit(false);
    } else {
      setAlertItems({ alertType: 4, onProceedAction: onCancelEdit });
      setOpenAlert(true);
    }
  };
  const onCancelEdit = () => {
    // on cancel edit, set title and contentEdit back to empty
    setTitle("");
    setContentEdit("");

    setToEdit(false);
  };

  const onDeleteNote = () => {
    setAlertItems({ alertType: 3, onProceedAction: deleteNote });
    setOpenAlert(true);
  };

  useEffect(() => {
    if (isCreateNew) {
      setTitle("");
      setContentEdit("");
    }
  }, [isCreateNew]);

  return (
    <>
      <div className="detail__container">
        {isDesktop && <div className="page__detail" />}
        <div className="note__content">
          <div className="detail__header">
            <Input
              value={isEditable ? title : listName}
              readOnly={!isEditable}
              fullWidth
              disableUnderline
              autoFocus={isEditable}
              onChange={(event) => setTitle(event.target.value)}
              className="list__title"
            />
            <div>
              {isEditable ? (
                <div className="edit__icons">
                  <Tooltip title="Save changes">
                    <Save onClick={onSaveClick} />
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <Cancel onClick={onCancelClick} />
                  </Tooltip>
                </div>
              ) : (
                <div className="action__icons">
                  <Tooltip title="Edit">
                    <EditRounded onClick={onEdit} />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteRounded onClick={onDeleteNote} />
                  </Tooltip>
                </div>
              )}
            </div>
          </div>

          <textarea
            value={isEditable ? contentEdit : content}
            readOnly={!isEditable}
            className="list__content"
            onChange={(event) => setContentEdit(event.target.value)}
          />
        </div>
      </div>

      {openAlert && <Alert setOpenAlert={setOpenAlert} items={alertItems} />}
    </>
  );
}

export default ListDetail;
