import {
  Button,
  Divider,
  Menu,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useState,
  MouseEvent,
  useEffect,
} from "react";
import "./settings.css";
import {
  Bedtime,
  EditTwoTone,
  Forest,
  Landscape,
  Waves,
  WbSunny,
} from "@mui/icons-material";
import TitleEdit from "../TitleEdit/titleEdit";

type SettingsType = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  anchorElement: null | HTMLElement;
  openMenu: boolean;
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
};

function SettingsMenu({
  title,
  setTitle,
  anchorElement,
  openMenu,
  setAnchorEl,
}: SettingsType) {
  const [toggleScheme, setToggleScheme] = useState("");
  const [toggleFont, setToggleFont] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleViewChange = (
    event: MouseEvent<HTMLElement>,
    nextScheme: string
  ) => {
    setToggleScheme(nextScheme);

    document.querySelector("html")?.setAttribute("data-theme", nextScheme);
  };

  const handleFontChange = (
    event: MouseEvent<HTMLElement>,
    nextFont: string
  ) => {
    setToggleFont(nextFont);
    document.querySelector("html")?.setAttribute("data-font", nextFont);
  };

  useEffect(() => {
    const theme = document.querySelector("html")?.getAttribute("data-theme");
    const font = document.querySelector("html")?.getAttribute("data-font");

    theme ? setToggleScheme(theme) : setToggleScheme("light");
    font ? setToggleFont(font) : setToggleFont("standard");
  }, []);


  return (
    <>
      <Menu
        anchorEl={anchorElement}
        open={openMenu}
        className="settings__menu"
        sx={{ maxWidth: "100%" }}
        onClose={() => setAnchorEl(null)}
      >
        <Button
          variant="outlined"
          startIcon={<EditTwoTone />}
          fullWidth
          className="edit__button"
          onClick={() => setOpenDialog(true)}
        >
          Edit title
        </Button>
        <div className="font__settings">
          <h4>Font Types</h4>
          <ToggleButtonGroup
            orientation="vertical"
            exclusive
            fullWidth
            value={toggleFont}
            onChange={handleFontChange}
          >
            <ToggleButton value="standard">Standard</ToggleButton>
            <ToggleButton value="halloween">Halloween</ToggleButton>
            <ToggleButton value="handwritten">Handwritten</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Divider />
        <div className="scheme__settings">
          <h4>Color Schemes</h4>
          <ToggleButtonGroup
            orientation="vertical"
            exclusive
            value={toggleScheme}
            fullWidth
            onChange={handleViewChange}
            className="schemes__toggle"
          >
            <ToggleButton value="light">
              <WbSunny />
              <h4>Light</h4>
            </ToggleButton>
            <ToggleButton value="dark">
              <Bedtime />
              <h4>Dark</h4>
            </ToggleButton>
            <ToggleButton value="coral">
              <Waves />
              <h4>Coral Spring</h4>
            </ToggleButton>
            <ToggleButton value="autumn">
              <Landscape />
              <h4>Autumn Red</h4>
            </ToggleButton>
            <ToggleButton value="halloween">
              <Forest />
              <h4>Halloween</h4>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Menu>
      {openDialog && (
        <TitleEdit
          title={title}
          setTitle={setTitle}
          setOpenDialog={setOpenDialog}
        />
      )}
    </>
  );
}

export default SettingsMenu;
