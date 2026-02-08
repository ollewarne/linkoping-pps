import { Children, useState } from "react";

const DND_FLAG = "popup-dnd-enabled";

function PopupManager({children}) {
 const [isDndEnabled, setIsDndEnabled] = useState(() => {
    const stored = localStorage.getItem(DND_FLAG);
    return stored === "true";
 });


 const toggleDnd = () => {
    setIsDndEnabled(prev => {
        const next = !prev;
        localStorage.setItem(DND_FLAG, String(next));
        return next;
    });
 };
 return children({ isDndEnabled, toggleDnd});
}

export default PopupManager;