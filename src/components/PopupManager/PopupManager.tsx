import { createContext, useState, ReactNode, useContext, FC } from "react";

interface DndContextValue {
  isDndEnabled: boolean;
  toggleDnd: () => void;
}

const DndContext = createContext<DndContextValue | undefined>(undefined);
const DND_FLAG = "popup-dnd-enabled";

interface DndProviderProps {
  children: ReactNode;
}

export const DndProvider: FC<DndProviderProps> = ({ children }) => {
  const [isDndEnabled, setIsDndEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem(DND_FLAG);
    return stored?.toLowerCase() === "true";
  });

  const toggleDnd = (): void => {
    setIsDndEnabled(prev => {
      const next = !prev;
      localStorage.setItem(DND_FLAG, String(next));
      return next;
    });
  };

  return <DndContext.Provider value={{ isDndEnabled, toggleDnd }}>{children}</DndContext.Provider>;
};

export const useDnd = (): DndContextValue => {
  const context = useContext(DndContext);
  if (!context) throw new Error("useDnd must be used within a DndProvider");
  return context;
};

export default DndProvider;