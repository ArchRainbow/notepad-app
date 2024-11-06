import { useState, MouseEvent } from "react";
import { SettingsOutlined } from "@mui/icons-material";
import ListCollection from "../ListCollection/listCollection";
import "./notepadBody.css";
import ListDetail from "../ListDetail/listDetail";
import empty from "../../app/empty.png";
import Alert from "../Alert/alert";
import { AlertData, ListData } from "../../models/types.model";
import { IconButton } from "@mui/material";
import SettingsMenu from "./Settings/settings";

const mockData: ListData[] = [
  {
    id: 0,
    listName: "Groceries",
    content: "Bread \n Milk \n Chocolate",
  },
  {
    id: 1,
    listName: "WWI",
    content: "Why do you call it WWI? Ohh, you'll see",
  },
  {
    id: 2,
    listName: "Coffee",
    content: "list of steps to brew a good cup of coffee",
  },
];

function NotepadBody() {
  const [selectedNote, setSelectedNote] = useState(-1);
  const [notes, setNotes] = useState<ListData[]>(mockData);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [title, setTitle] = useState("Len's Notepad");

  const [toEdit, setToEdit] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertItems, setAlertItems] = useState<AlertData>({
    alertType: -1,
    onProceedAction: () => {},
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const isEditable = toEdit || createNew;

  const getDetailCheck = (index: number) => {
    if (toEdit) {
      setAlertItems({
        alertType: 4,
        onProceedAction: () => getListDetail(index),
      });
      setOpenAlert(true);
    } else if (createNew) {
      setAlertItems({
        alertType: 5,
        onProceedAction: () => {
          deleteNote(notes.length - 1);
          getListDetail(0);
        },
      });
      setOpenAlert(true);
    } else getListDetail(index);
  };

  const getListDetail = (index: number) => {
    if (index === -1) {
      setNoteTitle("");
      setNoteContent("");
    } else {
      // if list is selected while toEdit/createNew is true, make it so its read-only
      if (createNew) setCreateNew(false);
      if (toEdit) setToEdit(false);

      setNoteTitle(notes[index].listName);
      setNoteContent(notes[index].content);
    }
  };

  const createNewHandler = () => {
    if (toEdit) setToEdit(false);

    const newLength = notes.length;
    setCreateNew(true);
    setSelectedNote(newLength);

    setNotes((prevState) => [
      ...prevState,
      {
        id: newLength,
        listName: "",
        content: "",
      },
    ]);

    getListDetail(-1);
  };

  const saveHandler = (title: string, cont: string) => {
    notes[selectedNote].listName = title;
    notes[selectedNote].content = cont;

    if (createNew) setCreateNew(false);
    getListDetail(selectedNote);
  };

  const deleteNote = (index?: number) => {
    const noteIndex = index ?? selectedNote;

    const filteredNotes = notes
      .filter((note) => note.id !== noteIndex)
      .map((elem, index) => ({ ...elem, id: index }));

    if (createNew) setCreateNew(false);
    setNotes(filteredNotes);
    setSelectedNote(-1);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <>
      <div className="notepad__container">
        <div className="notepad__header">
          <h1>{title}</h1>
          <div className="header__icons">
            <IconButton title="Settings menu" onClick={handleClick}>
              <SettingsOutlined />
            </IconButton>
          </div>
        </div>
        <div className="notepad__content">
          <ListCollection
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            listNames={notes}
            getSelected={getDetailCheck}
            onAddNewNote={createNewHandler}
          />
          {selectedNote !== -1 ? (
            <ListDetail
              isEditable={isEditable}
              noteDetail={{ listName: noteTitle, content: noteContent }}
              onSaveHandler={saveHandler}
              deleteNote={deleteNote}
              setToEdit={setToEdit}
              isCreateNew={createNew}
            />
          ) : (
            <div className="no__selection">
              <h2>Select a list to view its content or create a new one</h2>
              <img src={empty} alt="no list selected" />
            </div>
          )}
        </div>
        <footer className="footer__container">2024 - Karen Funes</footer>
      </div>
      {openAlert && <Alert setOpenAlert={setOpenAlert} items={alertItems} />}
      {openMenu && (
        <SettingsMenu
          title={title}
          setTitle={setTitle}
          openMenu={openMenu}
          anchorElement={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      )}
    </>
  );
}

export default NotepadBody;
