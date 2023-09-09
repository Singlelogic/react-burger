import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../burger-ingredients/ingredient-prop-type';
import { ConstructorContext } from '../../../services/burger-constructor/constructor-context';
import { DELETE_INGREDIENT } from '../../../services/burger-constructor/actions';

function BurgerConstructorItem({ ingredient }) {
  const { burgerConstructorDispatch } = useContext(ConstructorContext);

  function deleteIngredient() {
    burgerConstructorDispatch({
      type: DELETE_INGREDIENT,
      payload: {
        id: ingredient._id,
      },
    })
  }

  return (
    <ConstructorElement
      key={ingredient._id}
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      handleClose={deleteIngredient}
    />
  )
}

BurgerConstructorItem.propTypes = {
  ingredient: PropTypes.objectOf(ingredientPropType),
}

export default BurgerConstructorItem;
