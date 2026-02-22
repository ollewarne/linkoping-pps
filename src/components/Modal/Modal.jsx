import { useState } from "react";
import './Modal.css';

function Modal({ trigger, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {trigger}
            </div>
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsOpen(false)}>×</button>
                        {typeof children === 'function' ? children({ onClose: () => setIsOpen(false) }) : children}
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
