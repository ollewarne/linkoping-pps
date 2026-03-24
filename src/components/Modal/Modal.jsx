import React, { useState } from "react";
import './Modal.css';

function Modal({ trigger, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
        <>
            {React.cloneElement(trigger, { onClick: () => setIsOpen(true) })}
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={close}>×</button>
                        {React.Children.map(children, child => React.cloneElement(child, { onClose: close }))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
