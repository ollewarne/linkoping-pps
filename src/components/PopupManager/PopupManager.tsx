import { type ReactNode } from "react";
import { useTimer } from "../../contexts/TimerContext";
import { useDnd } from "../../contexts/DndContext";
import PauseStatistics from "../PauseStatistics/PauseStatistics";

interface Props {
  children: ReactNode;
}

const PopupManager = ({ children }: Props) => {
  const { showPopup, setShowPopup, activeActivity } = useTimer();
  const { isDndEnabled } = useDnd();

const handleSaveStats = (data: {
  timestamp: string;
  energy: number | null;
  productivity: number | null;
  factor: string | null;
}) => {
  if (!activeActivity) return;


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
