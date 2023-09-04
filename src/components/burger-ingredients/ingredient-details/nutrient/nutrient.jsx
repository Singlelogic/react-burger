import PropTypes from 'prop-types';
import styles from './nutrient.module.css';

function Nutrient({ title, value }) {
  return (
    <span className={styles.nutrient}>
      <span className="text text_type_main-default text_color_inactive">
        {title}
      </span>
      <span className="text text_type_digits-default text_color_inactive">
        {value}
      </span>
    </span>
  )
}

Nutrient.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
}

export default Nutrient;
