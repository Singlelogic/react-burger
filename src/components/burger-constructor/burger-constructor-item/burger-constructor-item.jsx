import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../burger-ingredients/ingredient-prop-type';
import { deleteIngredient } from '../../../services/burger-constructor/actions';

function BurgerConstructorItem({ ingredient }) {
  const dispatch = useDispatch();

  const [, refDrag] = useDrag({
    type: 'burger-constructor',
    item: ingredient,
  })

  return (
    <section ref={refDrag}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(deleteIngredient(ingredient))}
      />
    </section>
  )
}

BurgerConstructorItem.propTypes = {
  ingredient: PropTypes.objectOf(ingredientPropType),
}

export default BurgerConstructorItem;
