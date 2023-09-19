import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';
import { selectIngredient, unselectIngredient } from '../../../services/burger-ingredients/actions';
import { getBurgerConstructor } from '../../burger-constructor/burger-constructor';

function CardIngredient({ ingredient }) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const burgerConstructor = useSelector(getBurgerConstructor);

  const [, refDrag] = useDrag({
    type: 'burger-ingredients',
    item: ingredient,
  });

  const count = useMemo(() => {
    if (ingredient.type === 'bun' && burgerConstructor.bun) {
      return burgerConstructor.bun._id === ingredient._id ? 1 : 0;
    } else {
      return burgerConstructor.ingredients.reduce((acc, constructorIngredient) => {
        return acc + (constructorIngredient._id === ingredient._id ? 1 : 0)
      }, 0)
    }
  }, [
    burgerConstructor.ingredients,
    burgerConstructor.bun,
    ingredient._id,
    ingredient.type,
  ]);

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
        {count !== 0 &&
          <Counter count={count} size="small" />
        }
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
