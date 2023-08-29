import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader />
        <section className={styles.content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
      </>
    )
  }
}

export default App;
