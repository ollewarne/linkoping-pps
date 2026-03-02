import { ReactNode } from "react";
import { useTimer } from "../../contexts/TimerContext";
import { useDnd } from "../../contexts/DndContext";
import { useActivityHistory } from "../../contexts/activityHistoryContext";
import PauseStatistics from "../PauseStatistics/PauseStatistics";

interface Props {
  children: ReactNode;
}

const PopupManager = ({ children }: Props) => {
  const { showPopup, setShowPopup, activeActivity } = useTimer();
  const { isDndEnabled } = useDnd();
  const { historyDispatch } = useActivityHistory();

  const handleSaveStats = (data: {
    timestamp: string;
    efficiency: number | null;
    energy: number | null;
    factor: string | null;
  }) => {
    if (!activeActivity) return;

    const statEntry = {
      ...activeActivity,
      statistics: {
        ...(activeActivity.statistics ?? {}),
        [data.timestamp]: {
          efficiency: data.efficiency,
          energy: data.energy,
          factor: data.factor,
        },
      },
    };

    historyDispatch({
      type: "ADD_TO_HISTORY",
      payload: statEntry,
    });

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