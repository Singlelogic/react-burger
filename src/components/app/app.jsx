import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const url = "https://norma.nomoreparties.space/api/ingredients"

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  })

  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ ...state, isLoading: false, data: data.data }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false })
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const { data, isLoading, hasError } = state;
  return (
    <>
      <AppHeader />
      <section className={styles.content}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка при загрузке...'}
        {!isLoading &&
         !hasError &&
         data.length &&
          <>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </>
        }
      </section>
    </>
  )
}

export default App;
