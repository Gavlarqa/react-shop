import { productCategory, type product } from '@/app/interfaces/products';

function filterProducts(
  allProducts: product[] | null,
  pageSize: number,
  currentPage: number,
  categoryId: number | null
) {
  if (allProducts === null) return { numberOfPages: 0, filteredProducts: null };

  let filteredProducts: product[] =
    categoryId === null
      ? allProducts
      : allProducts.filter((x) => x.category.id === categoryId);

  const startIndex = currentPage === 0 ? 0 : (currentPage + 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const numberOfPages = Math.ceil(filteredProducts.length / pageSize);

  return {
    numberOfPages,
    filteredProducts: filteredProducts.slice(startIndex, endIndex),
  };
}

export function productPageReducer(
  state: ProductPageState,
  action: ProductPageAction
): ProductPageState {
  // console.log({ action });
  switch (action.type) {
    case 'PRODUCTS_LOADED': {
      const { numberOfPages, filteredProducts } = filterProducts(
        action.products,
        state.pageSize,
        0,
        state.selectedCategory
      );

      return {
        ...state,
        allProducts: action.products,
        filteredProducts,
        numberOfPages,
      };
    }
    case 'CATEGORY_TOGGLED': {
      if (action.categoryId === null) {
        const { numberOfPages, filteredProducts } = filterProducts(
          state.allProducts,
          state.pageSize,
          0,
          null
        );

        return {
          ...state,
          selectedCategory: null,
          filteredProducts,
          numberOfPages,
          title: 'All Products',
        };
      }

      if (state.allProducts === null) {
        return state;
      }

      const { numberOfPages, filteredProducts } = filterProducts(
        state.allProducts,
        state.pageSize,
        0,
        action.categoryId
      );

      return {
        ...state,
        selectedCategory: action.categoryId,
        filteredProducts,
        numberOfPages,
        title:
          state.categories === null
            ? 'All Products'
            : state.categories.find(
                (x: productCategory) => x.id === action.categoryId
              )?.name || 'All Products',
      };
    }
    case 'CATEGORIES_LOADED': {
      return { ...state, categories: action.categories };
    }
    case 'PAGE_CHANGED': {
      const { numberOfPages, filteredProducts } = filterProducts(
        state.allProducts,
        state.pageSize,
        action.pageNumber,
        state.selectedCategory
      );

      return {
        ...state,
        currentPage: action.pageNumber,
        filteredProducts,
        numberOfPages,
      };
    }
    default:
      return state;
  }
}

export const initialState: ProductPageState = {
  allProducts: null,
  filteredProducts: null,
  selectedCategory: null,
  categories: null,
  title: 'All Products',
  pageSize: 10,
  numberOfPages: 0,
  currentPage: 0,
};

interface ProductPageState {
  allProducts: product[] | null;
  categories: productCategory[] | null;
  filteredProducts: product[] | null;
  selectedCategory: number | null;
  title: string;
  pageSize: number;
  currentPage: number;
  numberOfPages: number;
}

type ProductPageAction =
  | { type: 'PRODUCTS_LOADED'; products: product[] }
  | { type: 'CATEGORY_TOGGLED'; categoryId: number | null }
  | { type: 'CATEGORIES_LOADED'; categories: productCategory[] }
  | { type: 'PAGE_CHANGED'; pageNumber: number };
