import React, { useState, useEffect, useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {
  ConstructorContext,
  initConstructor,
} from '../../services/burger-constructor/constructor-context';
import { burgerConstructorReducer } from '../../services/burger-constructor/reducer';

const url = "https://norma.nomoreparties.space/api/ingredients"

function App() {
  const [dataIngredients, setDataIngredients] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  })
  const [burgerConstructor, burgerConstructorDispatch] = useReducer(
    burgerConstructorReducer,
    initConstructor,
  );

  const getDataIngredients = () => {
    setDataIngredients({ ...dataIngredients, hasError: false, isLoading: true });
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.statusText} (status: ${res.status})`);
        }
        return res.json()
      })
      .then((data) => {
        setDataIngredients({ ...dataIngredients, isLoading: false, data: data.data })
      })
      .catch(e => {
        console.log('Error:', e.message);
        setDataIngredients({ ...dataIngredients, hasError: true, isLoading: false })
      });
  };

  useEffect(() => {
    getDataIngredients();
  }, []);

  const { data, isLoading, hasError } = dataIngredients;
  return (
    <>
      <AppHeader />
      <section className={styles.content}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка при загрузке...'}
        {!isLoading &&
         !hasError &&
         data.length &&
          <ConstructorContext.Provider value={{ burgerConstructor, burgerConstructorDispatch }}>
            <BurgerIngredients data={data} />
            <BurgerConstructor />
          </ConstructorContext.Provider>
        }
      </section>
    </>
  )
}

export default App;
