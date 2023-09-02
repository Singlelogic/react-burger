import PropTypes from 'prop-types';
import CardIngredient from '../ingredient-card/ingredient-card'
import ingredientPropType from '../ingredient-prop-type'

function IngredientsByType({ type, ingredients }) {
  return (
    <>
      <h2>{type}</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <CardIngredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </>
  )
}

IngredientsByType.propTypes = {
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType),
}

export default IngredientsByType;
