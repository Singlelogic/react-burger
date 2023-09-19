import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
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

const getConstructorIngredients = (state) => state.burgerConstructor.ingredients;

function BurgerConstructorItem({ ingredient }) {
  const dispatch = useDispatch();
  const ingredients = useSelector(getConstructorIngredients);

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
      <span className={`${isHover ? styles.on_hover : styles.hidden}`}/>
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
  ingredient: ingredientPropType.isRequired,
}

export default BurgerConstructorItem;
