import { createContext } from 'react';

export const initConstructor = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
}

export const ConstructorContext = createContext();
