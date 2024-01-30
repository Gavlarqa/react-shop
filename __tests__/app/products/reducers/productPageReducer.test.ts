import { product, productCategory } from '@/app/interfaces/products';
import {
  initialState as productPageInitialState,
  productPageReducer,
} from '@/app/products/reducers/productPageReducer';

describe('Product Page Reducer', () => {
  let allProducts: product[] = [];

  beforeAll(() => {
    for (let i = 0; i < 100; i++) {
      allProducts.push({
        id: i,
        title: 'Whatever ' + i,
        price: 1 * 1,
        images: [''],
        category: categories[0],
      });
    }
  });
  let initialState = productPageInitialState;

  const categories: productCategory[] = [
    { id: 1, name: 'Category One', image: '' },
    { id: 2, name: 'Category Two', image: '' },
    { id: 3, name: 'Category Three', image: '' },
  ];

  beforeEach(() => {
    initialState = productPageInitialState;
  });

  it('handles loading products', () => {
    const state = productPageReducer(initialState, {
      type: 'PRODUCTS_LOADED',
      products: allProducts,
    });

    expect(state.allProducts).toEqual(allProducts);
    expect(state.filteredProducts).toEqual(allProducts.slice(0, 10));
    expect(state.currentPage).toBe(0);
    expect(state.numberOfPages).toBe(10);
  });

  it('handles selecting a category', () => {
    const products = [
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
        category: { id: 3, image: '', name: 'Three' },
      },
    ];

    const state = productPageReducer(
      {
        ...initialState,
        allProducts: products,
        categories,
        selectedCategory: null,
      },
      {
        type: 'CATEGORY_TOGGLED',
        categoryId: 2,
      }
    );

    expect(state.allProducts).toEqual(products);
    expect(state.filteredProducts).toEqual([products[0]]);
    expect(state.title).toEqual('Category Two');
    expect(state.currentPage).toBe(0);
    expect(state.numberOfPages).toBe(1);
  });

  it('handles changing the currently selected category', () => {
    const products = [
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
        category: { id: 1, image: '', name: 'One' },
      },
    ];

    const state = productPageReducer(
      {
        ...initialState,
        allProducts: products,
        categories,
        selectedCategory: 2,
      },
      {
        type: 'CATEGORY_TOGGLED',
        categoryId: 1,
      }
    );

    expect(state.allProducts).toEqual(products);
    expect(state.filteredProducts).toEqual([products[1]]);
    expect(state.title).toEqual('Category One');
  });

  it('handles de-selecting a category', () => {
    const state = productPageReducer(
      {
        ...initialState,
        allProducts,
        categories,
        selectedCategory: 1,
      },
      {
        type: 'CATEGORY_TOGGLED',
        categoryId: null,
      }
    );

    expect(state.allProducts).toEqual(allProducts);
    expect(state.filteredProducts).toEqual(allProducts.slice(0, 10));
    expect(state.title).toEqual('All Products');
  });

  it('handles loading categories', () => {
    const state = productPageReducer(initialState, {
      type: 'CATEGORIES_LOADED',
      categories,
    });

    expect(state).toEqual({ ...initialState, categories });
  });

  it('handles paging the products', () => {
    const state = productPageReducer(
      { ...initialState, allProducts },
      {
        type: 'PAGE_CHANGED',
        pageNumber: 1,
      }
    );

    expect(state.currentPage).toBe(1);
    expect(state.filteredProducts).toEqual(allProducts.slice(10, 20));
    expect(state.numberOfPages).toBe(10);
  });

  it.each([
    [77, 8],
    [0, 0],
    [1, 1],
  ])(
    'sets the number of pages correctly for %s records',
    async (numberOfRecords: number, expectedNumberOfPages: number) => {
      let products = [];

      for (let i = 0; i < numberOfRecords; i++) {
        products.push({
          id: i,
          name: 'Whatever ' + i,
          price: 1 * 1,
          images: [''],
          title: 'Blah',
          category: categories[0],
        });
      }

      const state = productPageReducer(initialState, {
        type: 'PRODUCTS_LOADED',
        products,
      });

      expect(state.numberOfPages).toBe(expectedNumberOfPages);
    }
  );
});
