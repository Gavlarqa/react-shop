import { stat } from 'fs'

export function productPageReducer (state, action) {
  console.log({ action })
  switch (action.type) {
    case productPageTypes.PRODUCTS_LOADED:
      return {
        ...state,
        allProducts: action.products,
        filteredProducts: action.products
      }
    case productPageTypes.CATEGORY_TOGGLED:
      if (state.selectedCategory === action.categoryId) {
        return {
          ...state,
          selectedCategory: null,
          filteredProducts: state.allProducts,
          title: 'All Products'
        }
      }
      return {
        ...state,
        selectedCategory: action.categoryId,
        filteredProducts: state.allProducts.filter(
          (x) => x.category.id === action.categoryId
        ),
        title: state.categories.find((x) => x.id === action.categoryId).name
      }
    case productPageTypes.CATEGORIES_LOADED:
      return { ...state, categories: action.categories }
    default:
      break
  }
}

export const productPageTypes = {
  PRODUCTS_LOADED: 'products loaded',
  CATEGORY_TOGGLED: 'category toggled',
  CATEGORIES_LOADED: 'categories loaded'
}

export const initialState = {
  allProducts: null,
  filteredProducts: null,
  selectedCategory: null,
  categories: null,
  title: 'All Products'
}
