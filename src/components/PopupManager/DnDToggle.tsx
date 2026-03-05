import { type FC } from "react";
import { useDnd } from "../../contexts/DndContext";
import styles from "./DndToggle.module.css"

const DndToggle: FC = () => {
  const { isDndEnabled, toggleDnd } = useDnd();

  return (

    <button onClick={toggleDnd} className={isDndEnabled ? `header-btn ${styles.dndBtn}` : `header-btn ${styles.dndBtn} ${styles.dndBtnActive}`}>
      <img src={isDndEnabled ? '/notification-on.svg' : '/notification-off.svg'} alt="Notification selector" />
    </button>

    // <div className="dnd-toggle" onClick={toggleDnd}>
    //   <div className={`switch ${isDndEnabled ? "on" : "off"}`}>
    //     <div className="slider"></div>
    //   </div>
    //   <span className="label">DND</span>
    // </div>
  );
};

export default DndToggle;

