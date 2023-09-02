import PropTypes from 'prop-types';
import CardIngredient from '../ingredient-card/ingredient-card'
import ingredientPropTypes from '../ingredient-prop-types'

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
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
}

export default IngredientsByType;
