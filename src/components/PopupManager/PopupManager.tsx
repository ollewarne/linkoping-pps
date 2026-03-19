import { type ReactNode } from "react";
import { useTimer } from "../../contexts/TimerContext";
import { useDnd } from "../../contexts/DndContext";
import { useActivityHistory, getDateKeyFromIso } from "../../contexts/activityHistoryContext";
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
  productivity: number | null;
  factor: string | null;
}) => {
  if (!activeActivity) return;

  const { isActive, ...rest } = activeActivity as any;

  const updatedActivity = {
    ...rest,
  id: (activeActivity as any).id ?? String(Date.now()),
  title: (activeActivity as any).title ?? "",
  category: (activeActivity as any).category ?? "",
  isMeeting: (activeActivity as any).isMeeting ?? false,

  scheduledTime: activeActivity.scheduledTime ?? null,
  ranking: (activeActivity as any).ranking ?? 0,
  estimatedDuration: activeActivity.estimatedDuration ?? 0,
  activeTime: (activeActivity as any).activeTime ?? 25,
  breakTime: (activeActivity as any).breakTime ?? 5,
  totalTimeSpent: (activeActivity as any).totalTimeSpent ?? 0,

  currentlyActive: false,

  statistics: {
    ...(rest.statistics ?? {}),
    [data.timestamp]: {
      efficiency: data.efficiency ?? 0,
      productivity: data.productivity ?? 0,
      factor: data.factor ?? null,
    },
  },
};

  const isoForDateKey =
    (activeActivity as any).startedAt ??
    (activeActivity as any).startTime ??
    (activeActivity as any).createdAt ??
    new Date().toISOString();

  const dateKey = getDateKeyFromIso(isoForDateKey);

  historyDispatch({
    type: "ADD_TO_HISTORY",
    payload: { dateKey, activity: updatedActivity },
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
