'use client';
import { Grid, Paper, Table, TableBody, TableContainer } from '@mui/material';
import React, { useEffect, useReducer } from 'react';
import ProductListItem from './ProductListItem';
import { useSearchParams } from 'next/navigation';
import CategorySelector from './categories/CategorySelector';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  initialState,
  productPageReducer,
} from './reducers/productPageReducer';
import Paginator from '../components/Paginator';

export default function ListProductsPage() {
  const [state, dispatch] = useReducer(productPageReducer, initialState);

  const { filteredProducts, selectedCategory, categories, title } = state;
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryid');

  useEffect(() => {
    const queryString = categoryId ? `?categoryId=${categoryId}` : '';

    fetch('https://api.escuelajs.co/api/v1/products' + queryString)
      .then(async (res) => await res.json())
      .then((data) => {
        dispatch({
          type: 'PRODUCTS_LOADED',
          products: data,
        });
      });
  }, []);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(async (r) => await r.json())
      .then((data) => {
        dispatch({
          type: 'CATEGORIES_LOADED',
          categories: data,
        });
      });
  }, []);

  const handlePageChange = (newPage: number) => {
    dispatch({ type: 'PAGE_CHANGED', pageNumber: newPage });
  };

  const handleCategorySelection = (id: number | null) => {
    dispatch({
      type: 'CATEGORY_TOGGLED',
      categoryId: id,
    });
  };

  if (filteredProducts === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <React.Fragment>
      <Breadcrumbs links={[]} currentPage={title} />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelection}
          />
        </Grid>
        <Grid item xs={7}>
          {filteredProducts.length === 0 ? (
            <h2>There are no Products</h2>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='product table'>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <ProductListItem
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      imageUrl={product.images[0]}
                      categoryName={product.category.name}
                      price={product.price}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Paginator
            currentPage={state.currentPage}
            numberOfPages={state.numberOfPages}
            onChange={handlePageChange}
          />
        </Grid>
        <Grid item xs={3}>
          <hokodo-marketing data-element='square-small' />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
