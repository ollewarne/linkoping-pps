import { ReactNode } from "react";
import { useTimer } from "../../contexts/TimerContext";
import { useDnd } from "../../contexts/DndContext";
import PauseStatistics from "../PauseStatistics/PauseStatistics";

interface Props {
  children: ReactNode;
}

const PopupManager = ({ children }: Props) => {
  const { showPopup, setShowPopup, activeActivity } = useTimer();
  const { isDndEnabled } = useDnd();

  const handleSaveStats = (data: any) => {
    
    setShowPopup(false);
  };

  return (
    <>
      {children}

      {showPopup && !isDndEnabled && activeActivity && (
        <PauseStatistics onSave={handleSaveStats} />
      )}
    </>
  );
};

export default PopupManager;