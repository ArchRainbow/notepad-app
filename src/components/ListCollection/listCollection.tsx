import { Dispatch, SetStateAction, useState, MouseEvent } from "react";

import {
  AddCircleRounded,
  ExpandCircleDownRounded,
} from "@mui/icons-material";
import "./listCollection.css";
import { useMediaQuery } from "../../hooks/use-media-query";
import mediaQueries from "../../utils/constants";
import { IconButton, Menu } from "@mui/material";
import Card from "./Card/card";
import { ListData } from "../../models/types.model";


type CollectionProps = {
  selectedNote: number;
  setSelectedNote: Dispatch<SetStateAction<number>>;
  listNames: ListData[];
  getSelected: (index: number) => void;
  onAddNewNote: () => void;
};

function ListCollection({
  selectedNote,
  setSelectedNote,
  listNames,
  getSelected,
  onAddNewNote,
}:
CollectionProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const isTablet = useMediaQuery(mediaQueries.tablet);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onSelectNote = (id: number) => {
    if (openMenu) setAnchorEl(null);
    setSelectedNote(id);
    getSelected(id);
  };

  return (
    <div className="collection__container">
      <div className="collection__header">
        <h3>My notes</h3>
        <div className="collection__icons">
          {!isTablet && (
            <IconButton
              title="Expand notes"
              onClick={handleClick}
              className={`expand__icon ${openMenu ? "rotate" : ""}`}
            >
              <ExpandCircleDownRounded />
            </IconButton>
          )}
          <AddCircleRounded
            className="add__icon"
            onClick={() => onAddNewNote()}
          />
        </div>
      </div>

      {isTablet ? (
        <div className="collection__list">
          <Card
            listNames={listNames}
            selectedNote={selectedNote}
            onSelect={onSelectNote}
          />
        </div>
      ) : (
        <Menu
          open={openMenu}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          className="collection__menu"
        >
          <Card
            listNames={listNames}
            selectedNote={selectedNote}
            onSelect={onSelectNote}
          />
        </Menu>
      )}
    </div>
  );
}

export default ListCollection;
