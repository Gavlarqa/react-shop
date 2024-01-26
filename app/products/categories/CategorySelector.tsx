import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";

function CategorySelector({ selectedCategories, onSelectCategory }) {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data));
  }, []);

  if (categories === null) return <h2>Loading...</h2>;

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="category table">
          <TableBody>
            {categories.map((cat) => (
              <CategoryItem
                key={cat.id}
                category={cat}
                selected={selectedCategories.includes(cat.id)}
                onSelect={onSelectCategory}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default CategorySelector;
