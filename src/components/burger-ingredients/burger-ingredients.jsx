import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../ui/loader/loader';
import styles from './burger-ingredients.module.css';
import IngredientsByType from "./ingredients-by-type/ingredients-by-type";
import { getIngredients } from '../../services/burger-ingredients/actions';

const typeIngredients = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинки',
};

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');

  const {
    ingredients,
    ingredientsRequest,
    ingredientsFailed
  } = useSelector(store => store.burgerIngredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  const content = useMemo(() => {
    return ingredientsRequest ? (
      <Loader size="large" />
    ) : (
      ingredientsFailed ?
        <p className="text text_type_main-default">
          Ошибка загрузки данных!
        </p>
      :
        <div className={styles.list_ingredients}>
          {Object.keys(typeIngredients).map((key) => (
            <IngredientsByType
              key={key}
              type={typeIngredients[key]}
              ingredients={ingredients.filter((item) => item.type === key)}
            />
          ))}
        </div>
    )
  }, [ingredientsRequest, ingredients, ingredientsFailed]);

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

      {content}
    </div>
  )
}

export default BurgerIngredients;
