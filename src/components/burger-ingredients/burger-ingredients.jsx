import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import ingredientPropType from './ingredient-prop-type';
import IngredientsByType from "./ingredients-by-type/ingredients-by-type";
import { parseData } from '../../utils/parseData';

const typeIngredients = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинки',
};

function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState('bun');
  const ingredients = parseData(data);

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
          <IngredientsByType key={key} type={typeIngredients[key]} ingredients={ingredients[key]} />
        ))}
      </div>
    </div>
  )
}

BurgerIngredients.propType = {
  data: PropTypes.arrayOf(ingredientPropType),
}

export default BurgerIngredients;
