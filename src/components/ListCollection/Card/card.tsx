import "../listCollection.css";
import { ArrowForwardIosRounded } from "@mui/icons-material";

type ListData = {
  id: number;
  listName: string;
  content: string;
};

type CardProps = {
  listNames: ListData[];
  selectedNote: number;
  onSelect: (id: number) => void;
};
function Card({ listNames, selectedNote, onSelect }: CardProps) {
  return (
    <>
      {listNames.map(({ id, listName }) => (
        <div
          key={id}
          tabIndex={id}
          className={`card__container ${selectedNote === id ? "selected" : ""}`}
          onClick={() => onSelect(id)}
        >
          <h3>{listName}</h3>
          <ArrowForwardIosRounded className="card__icon" />
        </div>
      ))}
    </>
  );
}

export default Card;
