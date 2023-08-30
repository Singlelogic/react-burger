import CardIngredient from '../ingredient-card/ingredient-card'

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

export default IngredientsByType;
