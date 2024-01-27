import {
  initialState as productPageInitialState,
  productPageReducer,
  productPageTypes,
} from '@/app/products/reducers/productPageReducer';

describe.only('Product Page Reducer', () => {
  let initialState = productPageInitialState;

  const categories = [
    { id: 1, name: 'Category One' },
    { id: 2, name: 'Category Two' },
    { id: 3, name: 'Category Three' },
  ];
  const allProducts = [
    { id: 1, category: { id: 1 } },
    { id: 2, category: { id: 2 } },
    { id: 3, category: { id: 2 } },
    { id: 4, category: { id: 3 } },
  ];

  beforeEach(() => {
    initialState = productPageInitialState;
  });

  it('handles loading products', () => {
    const products = [{ id: 1, name: 'Whatever' }];
    const state = productPageReducer(initialState, {
      type: productPageTypes.PRODUCTS_LOADED,
      products,
    });

    expect(state.allProducts).toEqual(products);
    expect(state.filteredProducts).toEqual(products);
  });

  it('handles selecting a category', () => {
    const state = productPageReducer(
      {
        ...initialState,
        allProducts,
        categories,
        selectedCategory: null,
      },
      {
        type: productPageTypes.CATEGORY_TOGGLED,
        categoryId: 2,
      }
    );

    expect(state.allProducts).toEqual(allProducts);
    expect(state.filteredProducts).toEqual([
      { id: 2, category: { id: 2 } },
      { id: 3, category: { id: 2 } },
    ]);
    expect(state.title).toEqual('Category Two');
  });

  it('handles changing the currently selected category', () => {
    const state = productPageReducer(
      {
        ...initialState,
        allProducts,
        categories,
        selectedCategory: 2,
      },
      {
        type: productPageTypes.CATEGORY_TOGGLED,
        categoryId: 1,
      }
    );

    expect(state.allProducts).toEqual(allProducts);
    expect(state.filteredProducts).toEqual([{ id: 1, category: { id: 1 } }]);
    expect(state.title).toEqual('Category One');
  });

  it('handles de-selecting a category', () => {
    const state = productPageReducer(
      {
        ...initialState,
        allProducts,
        categories,
        selectedCategory: 2,
      },
      {
        type: productPageTypes.CATEGORY_TOGGLED,
        categoryId: null,
      }
    );

    expect(state.allProducts).toEqual(allProducts);
    expect(state.filteredProducts).toEqual(allProducts);
    expect(state.title).toEqual('All Products');
  });

  it('handles loading categories', () => {});
  it('sets the initial state correctly', () => {});
});
