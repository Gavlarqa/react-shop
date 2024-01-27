import { product, productCategory } from '@/app/interfaces/products';
import {
  initialState as productPageInitialState,
  productPageReducer,
} from '@/app/products/reducers/productPageReducer';

describe.only('Product Page Reducer', () => {
  let initialState = productPageInitialState;

  const categories: productCategory[] = [
    { id: 1, name: 'Category One', image: '' },
    { id: 2, name: 'Category Two', image: '' },
    { id: 3, name: 'Category Three', image: '' },
  ];

  const allProducts: product[] = [
    {
      id: 1,
      category: { id: 1, name: 'One', image: '' },
      price: 1,
      title: 'One',
      images: ['https://img.1'],
    },
    {
      id: 2,
      category: { id: 2, name: 'Two', image: '' },
      price: 2,
      title: 'Two',
      images: ['https://img.1'],
    },
    {
      id: 3,
      category: { id: 2, name: 'Two', image: '' },
      price: 3,
      title: 'Three',
      images: ['https://img.1'],
    },
    {
      id: 4,
      category: { id: 3, name: 'Three', image: '' },
      price: 4,
      title: 'Four',
      images: ['https://img.1'],
    },
  ];

  beforeEach(() => {
    initialState = productPageInitialState;
  });

  it('handles loading products', () => {
    const products = [
      {
        id: 1,
        name: 'Whatever',
        price: 1,
        images: [''],
        title: 'Blah',
        category: categories[0],
      },
    ];
    const state = productPageReducer(initialState, {
      type: 'PRODUCTS_LOADED',
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
        type: 'CATEGORY_TOGGLED',
        categoryId: 2,
      }
    );

    expect(state.allProducts).toEqual(allProducts);
    expect(state.filteredProducts).toEqual([
      {
        id: 2,
        images: ['https://img.1'],
        price: 2,
        title: 'Two',
        category: { id: 2, image: '', name: 'Two' },
      },
      {
        id: 3,
        images: ['https://img.1'],
        price: 3,
        title: 'Three',
        category: { id: 2, image: '', name: 'Two' },
      },
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
        type: 'CATEGORY_TOGGLED',
        categoryId: 1,
      }
    );

    expect(state.allProducts).toEqual(allProducts);
    expect(state.filteredProducts).toEqual([
      {
        id: 1,
        category: { id: 1, name: 'One', image: '' },
        images: ['https://img.1'],
        price: 1,
        title: 'One',
      },
    ]);
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
        type: 'CATEGORY_TOGGLED',
        categoryId: null,
      }
    );

    expect(state.allProducts).toEqual(allProducts);
    expect(state.filteredProducts).toEqual(allProducts);
    expect(state.title).toEqual('All Products');
  });

  it('handles loading categories', () => {
    const state = productPageReducer(initialState, {
      type: 'CATEGORIES_LOADED',
      categories,
    });

    expect(state).toEqual({ ...initialState, categories });
  });
});
