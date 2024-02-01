import {
  BasketContext,
  BasketDispatchContext,
} from '@/app/context/BasketContext';
import { product } from '@/app/interfaces/products';
import React, { useContext } from 'react';

function BasketSummary({ product }: BasketSummaryProps) {
  // const dispatch = useContext(BasketDispatchContext);
  const { state, dispatch } = useContext(BasketContext);

  const thisOne = state.products.find((x) => x.id === product.id);

  const handleClick = () => {
    dispatch({
      type: 'PRODUCT_ADDED',
      product,
    });
  };

  return (
    <React.Fragment>
      <h1>Basket Summary = {state.products.length}</h1>
      {!thisOne && (
        <button type='button' onClick={handleClick}>
          Add to Basket
        </button>
      )}
      {thisOne && (
        <div>
          <button
            onClick={() => {
              dispatch({
                type: 'QUANTITY_CHANGED',
                id: product.id,
                direction: 'decrement',
              });
            }}
          >
            Less
          </button>
          <span>{thisOne.quantity}</span>
          <button
            onClick={() => {
              dispatch({
                type: 'QUANTITY_CHANGED',
                id: product.id,
                direction: 'increment',
              });
            }}
          >
            More
          </button>
        </div>
      )}
      <h1>Total: {state.total}</h1>
    </React.Fragment>
  );
}

interface BasketSummaryProps {
  product: product;
}

export default BasketSummary;
