import { useState } from "react";

function PopupManager() {
 const [isDNDEnabled, setIsDndEnabled] = useState(false);

 const toggleDnd = () => {
    setIsDndEnabled(prev => !prev);
 };
 return null;
}

export default PopupManager;