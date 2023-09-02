import { useState } from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';

function CardIngredient({ ingredient }) {
  const [isVisible, setIsVisible] = useState(false);
  const [ingredientId, setIngredientId] = useState(ingredient._id);

  function handleOpenModal() {
    setIsVisible(true)
  }

  function handleCloseModal() {
    setIsVisible(false)
  }

  return (
    <>
      <div className={styles.card} onClick={handleOpenModal} >
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

      {isVisible &&
        <Modal onClose={handleCloseModal} >
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      }
    </>
  )
}

CardIngredient.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
}

export default CardIngredient;
