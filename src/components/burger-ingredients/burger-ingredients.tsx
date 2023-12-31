import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useMemo, useRef, useCallback } from "react";

import styles from "./burger-ingredients.module.css";
import CardIngredient from "./ingredient-card/ingredient-card";
import { useSelector } from "../../services/store";
import { Loader } from "../../ui/loader/loader";
import { IIngredient } from "../../types/ingredient";
import { getBurgerIngredientsStore } from "../../utils/store";


type TTypeIngredients = {
  [key: string]: string,
}

const typeIngredients: TTypeIngredients = {
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
  } = useSelector(getBurgerIngredientsStore);

  type TRefs = {
    [key: string]: React.RefObject<HTMLDivElement>,
  }

  const refs: TRefs = {
    'bun': useRef(null),
    'sauce': useRef(null),
    'main': useRef(null),
    'list': useRef(null),
  }

  const handlerScroll = useCallback(() => {
    const scrollPosition = Number(refs['list']?.current?.scrollTop) || 0;
    const bunOffsetHeight = Number(refs['bun']?.current?.offsetHeight) || 0;
    const sauceOffsetHeight = Number(refs['sauce']?.current?.offsetHeight) || 0;

    if (scrollPosition <= bunOffsetHeight) {
      setCurrent('bun');
    } else if (scrollPosition <= bunOffsetHeight + sauceOffsetHeight) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  }, [refs]);

  useEffect(() => {
    if (refs['list'].current) {
      refs['list'].current.addEventListener('scroll', handlerScroll);
    }
    return () => {
      if (refs['list'].current) {
        refs['list'].current.removeEventListener('scroll', handlerScroll);
      }
    }
  }, [handlerScroll, refs]);

  const handlerClickTab = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const content = useMemo(() => {
    return ingredientsRequest ? (
      <Loader size="large" />
    ) : (
      ingredientsFailed ?
        <p className="text text_type_main-default error-text">
          Ошибка загрузки данных!
        </p>
      :
        <div className={styles.list_ingredients} ref={refs['list']}>
          {Object.keys(typeIngredients).map((key) => (
            <div key={key} ref={refs[key]}>
              <section>
                <h2>{typeIngredients[key]}</h2>
                {ingredients.filter((item: IIngredient) => item.type === key).map((ingredient) => (
                  <CardIngredient key={ingredient._id} ingredient={ingredient} />
                ))}
              </section>
            </div>
          ))}
        </div>
    )
  }, [ingredientsRequest, ingredients, ingredientsFailed, refs]);

  return (
    <div className={styles.content}>
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
