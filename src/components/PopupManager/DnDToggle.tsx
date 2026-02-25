import { type FC } from "react";
import { useDnd } from "./PopupManager";
// import "./DndToggle.css";
import styles from "./DndToggle.module.css"

const DndToggle: FC = () => {
  const { isDndEnabled, toggleDnd } = useDnd();

  return (

    <button onClick={toggleDnd} className={styles['language-toggle-btn']}>
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

