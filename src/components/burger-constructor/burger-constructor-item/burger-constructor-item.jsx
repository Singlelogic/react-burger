import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../burger-ingredients/ingredient-prop-type';
import { deleteIngredient } from '../../../services/burger-constructor/actions';

function BurgerConstructorItem({ ingredient }) {
  const dispatch = useDispatch();

  return (
    <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      handleClose={() => dispatch(deleteIngredient(ingredient))}
    />
  )
}

BurgerConstructorItem.propTypes = {
  ingredient: PropTypes.objectOf(ingredientPropType),
}

export default BurgerConstructorItem;
