import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';

const bun = data.find(item => item._id === '60666c42cc7b410027a1a9b1');

function BurgerConstructor() {
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
          {data.map((ingredient) => {
            return (ingredient.type === 'main' || ingredient.type === 'sauce') ?
              <ConstructorElement
                key={ingredient._id}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              /> : null}
            )
          }
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

export default BurgerConstructor;
