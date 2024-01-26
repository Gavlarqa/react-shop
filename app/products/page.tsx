"use client";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import { useSearchParams } from "next/navigation";
import CategorySelector from "./categories/CategorySelector";

export default function ListProductsPage() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categoryId = searchParams.get("categoryid");

  useEffect(() => {
    const queryString = categoryId ? `?categoryId=${categoryId}` : "";

    fetch("https://api.escuelajs.co/api/v1/products" + queryString)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setCategories(data.map((p) => p.category.name));
      });
  }, []);

  const handleCategorySelection = (id) => {
    const index = selectedCategories.findIndex((x) => x === id);

    if (index < 0) {
      setSelectedCategories([...selectedCategories, id]);
    } else {
      selectedCategories.splice(index, 1);

      setSelectedCategories([...selectedCategories]);
    }

    setFilteredProducts(
      products.filter((p) => selectedCategories.includes(p.category.id))
    );
  };

  if (products === null) {
    return <h2>Loading...</h2>;
  }

  if (products.length === 0) {
    return <h2>There are no Products</h2>;
  }

  console.log({ selectedCategories });

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CategorySelector
            selectedCategories={selectedCategories}
            onSelectCategory={handleCategorySelection}
          />
        </Grid>
        <Grid item xs={9}>
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
