import { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

function Modal(props) {
  const { children, header, onClose } = props;

  const handleKeyEscape = useCallback((e) => {
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
            <span className={styles.header + ' text text_type_main-default'}>
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

Modal.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  onClose: PropTypes.func,
}

export default Modal;
