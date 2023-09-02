import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../burger-ingredients/ingredient-prop-type';
import { parseData } from '../../utils/parseData';

function BurgerConstructor({ data }) {
  const ingredients = parseData(data);
  const bun = ingredients['bun'][0];
  const middleIngredients = [
    ...ingredients['sauce'],
    ...ingredients['main'],
  ];

  return (
    <div className={styles.burger_constructor}>

      <div className={styles.list_ingredients}>
        <ConstructorElement
          key={bun._id}
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />

        <div className={styles.middle_ingredients}>
          {middleIngredients.map((ingredient) => {
            return (
              <ConstructorElement
                key={ingredient._id}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            )
          })}
        </div>

        <ConstructorElement
          key={bun._id}
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <div className={styles.order}>
        <p className="text text_type_digits-medium">610</p>
        <CurrencyIcon type="primary"/>
        <Button type="primary" size="medium">Оформить заказ</Button>
      </div>
    </div>
  );
}


BurgerConstructor.propType = {
  data: PropTypes.arrayOf(ingredientPropType),
}

export default BurgerConstructor;
