import { FC } from "react";
import { useDnd } from "./PopupManager";
import "./DndToggle.css";

const DndToggle: FC = () => {
  const { isDndEnabled, toggleDnd } = useDnd();

  return (
    <div className="dnd-toggle" onClick={toggleDnd}>
      <div className={`switch ${isDndEnabled ? "on" : "off"}`}>
        <div className="slider"></div>
      </div>
      <span className="label">DND</span>
    </div>
  );
};

export default DndToggle;