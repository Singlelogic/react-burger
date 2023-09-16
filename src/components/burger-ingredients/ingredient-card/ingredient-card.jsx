import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';
import { ConstructorContext } from '../../../services/burger-constructor/constructor-context';
import { ADD_INGREDIENT } from '../../../services/burger-constructor/actions';

function CardIngredient({ ingredient }) {
  const [isVisible, setIsVisible] = useState(false);
//  const { burgerConstructorDispatch } = useContext(ConstructorContext);

  function handleClickCard() {
    handleOpenModal();
//    burgerConstructorDispatch({type: ADD_INGREDIENT, payload: ingredient});
  }

  function handleOpenModal() {
    setIsVisible(true)
  }

  function handleCloseModal() {
    setIsVisible(false)
  }

  return (
    <>
      <div className={styles.card} onClick={handleClickCard} >
        <Counter count={1} size="small" />
        <img src={ingredient.image} alt={ingredient.name} />
        <span className={styles.price}>
          <span className="text text_type_digits-default">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </span>
        <span className="text text_type_main-small">
          {ingredient.name}
        </span>
      </div>

      {isVisible &&
        <Modal header="Детали ингредиента" onClose={handleCloseModal} >
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
