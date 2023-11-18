import React, { FC, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";


const modalRoot = document.getElementById('react-modals') as HTMLElement;

interface IModal {
  children: React.ReactNode;
  header?: string;
  onClose: () => void;
}

const Modal: FC<IModal> = ({ children, header, onClose }) => {
  const handleKeyEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEscape);
    return () => {
      document.removeEventListener('keydown', handleKeyEscape);
    }
  }, [handleKeyEscape]);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={onClose} />
        <div className={styles.modal}>
          <p>
            <span
              className={styles.header + ' text text_type_main-default'}
              data-test-id="modal-header"
            >
              {header}
            </span>
            <span className={styles.btn_close} onClick={onClose}>x</span>
          </p>
          <span className='text text_type_main-default'>
            {children}
          </span>
        </div>
      </>
    ),
    modalRoot
  );
}

export default Modal;
