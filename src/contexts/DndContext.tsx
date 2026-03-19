import { createContext, useState, useContext, type ReactNode, type FC } from "react";

interface DndContextValue {
  isDndEnabled: boolean;
  toggleDnd: () => void;
}

const DndContext = createContext<DndContextValue | undefined>(undefined);

const DND_FLAG = "popup-dnd-enabled";

export const DndProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDndEnabled, setIsDndEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem(DND_FLAG);
    return stored?.toLowerCase() === "true";
  });

  const toggleDnd = () => {
    setIsDndEnabled(prev => {
      const next = !prev;
      localStorage.setItem(DND_FLAG, String(next));
      return next;
    });
  };

  return (
    <DndContext.Provider value={{ isDndEnabled, toggleDnd }}>
      {children}
    </DndContext.Provider>
  );
};

export const useDnd = () => {
  const context = useContext(DndContext);
  if (!context) throw new Error("useDnd must be used within DndProvider");
  return context;
};
