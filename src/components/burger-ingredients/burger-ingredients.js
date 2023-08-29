import React from 'react';
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { data } from '../../utils/data';
import { parseIngredients } from '../../utils/parseData';

const typeIngredients = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинки',
};
const ingredients = parseIngredients(data);

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

function CardIngredient({ ingredient }) {
	return (
		<div className={styles.card_ingredient}>
			<img src={ingredient.image} alt={ingredient.ingredient} />
      <span className={styles.ingredient__price}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type="primary" className={styles.currencyIcon} />
      </span>
			<span className="text text_type_main-small">
        {ingredient.name}
      </span>
		</div>
	)
}

function BurgerIngredients() {
	const [current, setCurrent] = React.useState('bun');

	return (
		<div className={styles.burger_ingredients}>
			<h1 className="text text_type_main-large">Соберите бургер</h1>

			<div className={styles.tabs}>
        {Object.keys(typeIngredients).map((key) => (
          <Tab key={key} value={key} active={current === key} onClick={setCurrent}>
					  {typeIngredients[key]}
          </Tab>
        ))}
			</div>

			<div className={styles.list_ingredients}>
				{Object.keys(typeIngredients).map((key) => (
					<IngredientsByType type={typeIngredients[key]} ingredients={ingredients[key]} />
        ))}
			</div>
		</div>
	)
}

export default BurgerIngredients;
