import { createContext } from 'react';

export const initConstructor = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
  orderNumber: null,
}

export const ConstructorContext = createContext();
