import { productCategory, type product } from '@/app/interfaces/products';

export function productPageReducer(
  state: ProductPageState,
  action: ProductPageAction
): ProductPageState {
  console.log({ action });
  switch (action.type) {
    case 'PRODUCTS_LOADED':
      return {
        ...state,
        allProducts: action.products,
        filteredProducts:
          state.selectedCategory === null
            ? action.products
            : action.products.filter(
                (x: product) => x.category.id === state.selectedCategory
              ),
      };

    case 'CATEGORY_TOGGLED':
      if (action.categoryId === null) {
        return {
          ...state,
          selectedCategory: null,
          filteredProducts: state.allProducts,
          title: 'All Products',
        };
      }

      if (state.allProducts === null) {
        return state;
      }

      return {
        ...state,
        selectedCategory: action.categoryId,
        filteredProducts: state.allProducts.filter(
          (x: product) => x.category.id === action.categoryId
        ),
        title:
          state.categories === null
            ? 'All Products'
            : state.categories.find(
                (x: productCategory) => x.id === action.categoryId
              )?.name || 'All Products',
      };
    case 'CATEGORIES_LOADED':
      return { ...state, categories: action.categories };
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
};

interface ProductPageState {
  allProducts: product[] | null;
  categories: productCategory[] | null;
  filteredProducts: product[] | null;
  selectedCategory: number | null;
  title: string;
}

type ProductPageAction =
  | { type: 'PRODUCTS_LOADED'; products: product[] }
  | { type: 'CATEGORY_TOGGLED'; categoryId: number | null }
  | { type: 'CATEGORIES_LOADED'; categories: productCategory[] };
