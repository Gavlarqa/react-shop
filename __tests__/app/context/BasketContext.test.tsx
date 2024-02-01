import { BasketContext, BasketProvider } from '@/app/context/BasketContext';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';

describe('Basket Context', () => {
  const BasketTest = () => {
    const { state, dispatch } = useContext(BasketContext);

    const { products, total } = state;

    return (
      <div>
        <button
          onClick={() =>
            dispatch({ type: 'PRODUCT_ADDED', product: { id: 1, price: 10 } })
          }
          data-testid={'add first product'}
        >
          Add New Product
        </button>
        <button
          onClick={() =>
            dispatch({ type: 'PRODUCT_ADDED', product: { id: 2, price: 20 } })
          }
          data-testid={'add second product'}
        >
          Add New Product
        </button>
        <button
          data-testid='increase quantity'
          onClick={() => {
            dispatch({
              type: 'QUANTITY_CHANGED',
              id: 1,
              direction: 'increment',
            });
          }}
        >
          Increment Quantity
        </button>
        <button
          data-testid='decrease quantity'
          onClick={() => {
            dispatch({
              type: 'QUANTITY_CHANGED',
              id: 1,
              direction: 'decrement',
            });
          }}
        >
          Increment Quantity
        </button>
        <table>
          <tbody data-testid='products'>
            {products.map((p) => (
              <tr key={p.id} data-testid={`product-${p.id}`}>
                <td data-testid='id'>{p.id}</td>
                <td data-testid='quantity'>{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span data-testid='basket total'>{total}</span>
      </div>
    );
  };

  it('handles adding items to the basket', async () => {
    const user = userEvent.setup();

    render(
      <BasketProvider>
        <BasketTest />
      </BasketProvider>
    );

    // expect there to be zero products in the basket
    expect((await screen.findByTestId('products')).children).toHaveLength(0);
    expect((await screen.findByTestId('basket total')).textContent).toBe('0');

    // add one item to the basket
    await user.click(await screen.findByTestId('add first product'));

    // expect there to be one row
    expect((await screen.findByTestId('products')).children).toHaveLength(1);

    // product one is 10
    expect((await screen.findByTestId('basket total')).textContent).toBe('10');

    // and that one row should have a quantity of 1
    expect(
      (
        await within(await screen.findByTestId('product-1')).findByTestId(
          'quantity'
        )
      ).textContent
    ).toBe('1');

    // add the same product again to the basket
    await user.click(await screen.findByTestId('add first product'));

    // there should still be one row
    expect((await screen.findByTestId('products')).children).toHaveLength(1);

    // and the basket total should not change
    expect((await screen.findByTestId('basket total')).textContent).toBe('10');

    // and the quantity should not change
    expect(
      (
        await within(await screen.findByTestId('product-1')).findByTestId(
          'quantity'
        )
      ).textContent
    ).toBe('1');

    // add another product to the basket
    await user.click(await screen.findByTestId('add second product'));

    // there should now be two products
    expect((await screen.findByTestId('products')).children).toHaveLength(2);

    // add the cost of product two (which has a cost of 20)
    expect((await screen.findByTestId('basket total')).textContent).toBe('30');

    // product one should still have a quantity of two
    expect(
      (
        await within(await screen.findByTestId('product-1')).findByTestId(
          'quantity'
        )
      ).textContent
    ).toBe('1');

    // product two should still have a quantity of one
    expect(
      (
        await within(await screen.findByTestId('product-2')).findByTestId(
          'quantity'
        )
      ).textContent
    ).toBe('1');
  });

  it('handles updating the quantity', async () => {
    const user = userEvent.setup();
    render(
      <BasketProvider>
        <BasketTest />
      </BasketProvider>
    );

    await user.click(await screen.findByTestId('add first product'));
    await user.click(await screen.findByTestId('increase quantity'));

    // the quantity should now be 2
    expect(
      (
        await within(await screen.findByTestId('product-1')).findByTestId(
          'quantity'
        )
      ).textContent
    ).toBe('2');

    // and the cost should be 20. (10 * 2)
    expect((await screen.findByTestId('basket total')).textContent).toBe('20');

    await user.click(await screen.findByTestId('decrease quantity'));

    // the quantity should now be 2
    expect(
      (
        await within(await screen.findByTestId('product-1')).findByTestId(
          'quantity'
        )
      ).textContent
    ).toBe('1');

    // and the cost should be 20. (10 * 2)
    expect((await screen.findByTestId('basket total')).textContent).toBe('10');

    // click decrement again (reducing the quantity to 0)
    await user.click(await screen.findByTestId('decrease quantity'));

    // no products in the basket
    expect((await screen.findByTestId('products')).children).toHaveLength(0);

    // and the cost should be 20. (10 * 2)
    expect((await screen.findByTestId('basket total')).textContent).toBe('0');
  });
});
