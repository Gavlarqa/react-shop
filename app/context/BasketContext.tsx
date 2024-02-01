import { createContext, useReducer, Dispatch } from 'react';
import { IBasketProduct } from '../interfaces/products';

const initialBasket: BasketState = {
  products: [],
  total: 0,
};

interface Basket {
  state: BasketState;
  dispatch: Dispatch<any>;
}

export const BasketContext = createContext<Basket>({} as Basket);

export function BasketProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [state, dispatch] = useReducer(basketReducer, initialBasket);

  return (
    <BasketContext.Provider value={{ state, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
}

function basketReducer(state: BasketState, action: BasketAction) {
  const { products } = state;
  switch (action.type) {
    case 'PRODUCT_ADDED': {
      const { product } = action;

      if (products.find((x) => x.id === product.id)) {
        return state;
      }

      let newProducts = state.products.slice();

      newProducts.push({ ...action.product, quantity: 1 });

      const newState = {
        ...state,
        products: newProducts,
        total: calculateBasketTotal(newProducts),
      };

      return newState;
    }
    case 'QUANTITY_CHANGED': {
      const currentIndex = products.findIndex((x) => x.id === action.id);

      if (currentIndex < 0) {
        return state;
      }
      const updatedProduct =
        products.at(currentIndex) || ({} as IBasketProduct);

      if (action.direction === 'increment') {
        updatedProduct.quantity += 1;
      } else if (action.direction === 'decrement') {
        updatedProduct.quantity -= 1;
      }

      let newProducts = [...state.products];

      if (updatedProduct.quantity < 1) {
        newProducts = newProducts.filter((x) => x.id !== action.id);
      } else {
        newProducts[currentIndex] = updatedProduct;
      }

      return {
        ...state,
        products: newProducts,
        total: calculateBasketTotal(newProducts),
      };
    }
    default:
      return state;
  }
}

function calculateBasketTotal(basketItems: IBasketProduct[]) {
  return basketItems.reduce((p: number, n: IBasketProduct) => {
    return p + n.price * n.quantity;
  }, 0);
}

type BasketState = {
  products: IBasketProduct[];
  total: number;
};

type BasketAction =
  | { type: 'QUANTITY_CHANGED'; id: number; direction: string }
  | { type: 'PRODUCT_ADDED'; product: IBasketProduct };
