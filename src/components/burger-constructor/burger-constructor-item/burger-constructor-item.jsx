import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-item.module.css';
import ingredientPropType from '../../burger-ingredients/ingredient-prop-type';
import {
  deleteIngredient,
  moveIngredient,
} from '../../../services/burger-constructor/actions';

function BurgerConstructorItem({ ingredient }) {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.burgerConstructor.ingredients);

  const [{ opacity }, refDrag] = useDrag({
    type: 'burger-constructor',
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    })
  })

  const [{ isHover }, targetDrop] = useDrop({
    accept: 'burger-constructor',
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(dragIngredient) {
      dispatch(moveIngredient(dragIngredient, ingredient, ingredients));
    }
  })

  return (
    <section ref={targetDrop}>
      <span className={`${ isHover ? styles.on_hover : styles.hidden }`}></span>
      <section ref={refDrag} style={{ opacity }}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => dispatch(deleteIngredient(ingredient))}
        />
      </section>
    </section>
  )
}

BurgerConstructorItem.propTypes = {
  ingredient: PropTypes.objectOf(ingredientPropType),
}

export default BurgerConstructorItem;
