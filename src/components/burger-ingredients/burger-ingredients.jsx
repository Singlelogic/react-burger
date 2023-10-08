import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../ui/loader/loader';
import styles from './burger-ingredients.module.css';
import IngredientsByType from "./ingredients-by-type/ingredients-by-type";


const typeIngredients = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинки',
};

export const getBurgerIngredients = (state) => state.burgerIngredients;

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');

  const {
    ingredients,
    ingredientsRequest,
    ingredientsFailed
  } = useSelector(getBurgerIngredients);

  const refs = {
    'bun': useRef(),
    'sauce': useRef(),
    'main': useRef(),
    'list': useRef(),
  }

  const handlerScroll = useCallback(() => {
    const scrollPosition = refs['list'].current.scrollTop;
    const bunOffsetHeight = Number(refs['bun'].current.offsetHeight);
    const sauceOffsetHeight = Number(refs['sauce'].current.offsetHeight);

    if (scrollPosition <= bunOffsetHeight) {
      setCurrent('bun');
    } else if (scrollPosition <= bunOffsetHeight + sauceOffsetHeight) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  })

  useEffect(() => {
    if (refs['list'].current) {
      refs['list'].current.addEventListener('scroll', handlerScroll);
    }
    return () => {
      if (refs['list'].current) {
        refs['list'].current.removeEventListener('scroll', handlerScroll);
      }
    }
  }, [handlerScroll]);

  const handlerClickTab = (ref) => {
    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const content = useMemo(() => {
    return ingredientsRequest ? (
      <Loader size="large" />
    ) : (
      ingredientsFailed ?
        <p className="text text_type_main-default">
          Ошибка загрузки данных!
        </p>
      :
        <div className={styles.list_ingredients} ref={refs['list']}>
          {Object.keys(typeIngredients).map((key) => (
            <div key={key} ref={refs[key]}>
              <IngredientsByType
                key={key}
                type={typeIngredients[key]}
                ingredients={ingredients.filter((item) => item.type === key)}
              />
            </div>
          ))}
        </div>
    )
  }, [ingredientsRequest, ingredients, ingredientsFailed]);

  return (
    <div className={styles.burger_ingredients}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>

      <div className={styles.tabs}>
        {Object.keys(typeIngredients).map((key) => (
          <div key={key} onClick={() => handlerClickTab(refs[key])}>
            <Tab key={key} value={key} active={current === key} onClick={setCurrent}>
              {typeIngredients[key]}
            </Tab>
          </div>
        ))}
      </div>

      {content}
    </div>
  )
}

export default BurgerIngredients;
