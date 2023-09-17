import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';
import { selectIngredient, unselectIngredient } from '../../../services/burger-ingredients/actions';

function CardIngredient({ ingredient }) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const [, refDrag] = useDrag({
    type: 'burger-ingredients',
    item: ingredient,
  });

  function handleOpenModal() {
    setIsVisible(true);
    dispatch(selectIngredient(ingredient));
  }

  function handleCloseModal() {
    setIsVisible(false);
    dispatch(unselectIngredient());
  }

  return (
    <>
      <div className={styles.card} onClick={handleOpenModal} ref={refDrag}>
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
