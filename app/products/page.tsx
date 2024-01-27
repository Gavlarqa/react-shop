"use client";
import { Grid, Paper, Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import { useEffect, useReducer } from "react";
import ProductListItem from "./ProductListItem";
import { useSearchParams } from "next/navigation";
import CategorySelector from "./categories/CategorySelector";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  initialState,
  productPageReducer,
  productPageTypes,
} from "./reducers/productPageReducer";

export default function ListProductsPage() {
  const [state, dispatch] = useReducer(productPageReducer, initialState);

  const { filteredProducts, selectedCategory, categories, title } = state;
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryid");

  useEffect(() => {
    const queryString = categoryId ? `?categoryId=${categoryId}` : "";

    fetch("https://api.escuelajs.co/api/v1/products" + queryString)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: productPageTypes.PRODUCTS_LOADED,
          products: data,
        });
      });
  }, []);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: productPageTypes.CATEGORIES_LOADED,
          categories: data,
        });
      });
  }, []);

  const handleCategorySelection = (id: number) => {
    dispatch({
      type: productPageTypes.CATEGORY_TOGGLED,
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
              <Table sx={{ minWidth: 650 }} aria-label="product table">
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
        </Grid>
        <Grid item xs={3}>
          <hokodo-marketing data-element="square-small" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}