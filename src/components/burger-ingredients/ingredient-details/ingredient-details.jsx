import styles from './ingredient-details.module.css';
import Nutrient from './nutrient/nutrient';
import ingredientPropType from '../ingredient-prop-type';

function IngredientDetails({ ingredient }) {
  return (
    <div className={styles.content}>
      <img src={ingredient.image} alt={ingredient.name} />
      <p className="text text_type_main-medium">{ingredient.name}</p>
      <div className={styles.nutrients}>
        <Nutrient title="Калории, ккал" value={ingredient.calories} />
        <Nutrient title="Белки, г" value={ingredient.proteins} />
        <Nutrient title="Жиры, г" value={ingredient.fat} />
        <Nutrient title="Углеводы, г" value={ingredient.carbohydrates} />
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired,
}

export default IngredientDetails;
