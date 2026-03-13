import React, { useState } from "react";
import './ModalToCalendarDaysPopup.css'

function ModalToCalendarDaysPopup({ trigger, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {trigger}
            </div>
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content-calendar-days" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={close}>×</button>
                        {React.Children.map(children, child => React.cloneElement(child, {onClose: close}))}
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalToCalendarDaysPopup;
