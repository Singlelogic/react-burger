import PropTypes from 'prop-types';
import CardIngredient from '../ingredient-card/ingredient-card'
import ingredientPropType from '../ingredient-prop-type'

function IngredientsByType({ type, ingredients }) {
  return (
    <section>
      <h2>{type}</h2>
      {ingredients.map((ingredient) => (
        <CardIngredient key={ingredient._id} ingredient={ingredient} />
      ))}
    </section>
  )
}

IngredientsByType.propTypes = {
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType),
}

export default IngredientsByType;
