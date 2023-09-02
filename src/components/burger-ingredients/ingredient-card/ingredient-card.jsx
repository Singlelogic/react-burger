import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import ingredientPropTypes from '../ingredient-prop-types'

function CardIngredient({ ingredient }) {
  return (
    <div className={styles.card}>
      <Counter count={1} size="small" />
      <img src={ingredient.image} alt={ingredient.name} />
      <span className={styles.price}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type="primary" className={styles.currencyIcon} />
      </span>
      <span className="text text_type_main-small">
        {ingredient.name}
      </span>
    </div>
  )
}

CardIngredient.propTypes = {
  ingredient: PropTypes.objectOf(ingredientPropTypes),
}

export default CardIngredient;
