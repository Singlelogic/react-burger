import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}

ModalOverlay.propType = {
  closeModal: PropTypes.func.isRequired,
}

export default ModalOverlay;
