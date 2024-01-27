import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import CategoryItem from './CategoryItem'

function CategorySelector ({ selectedCategory, onSelectCategory, categories }) {
  // const [categories, setCategories] = useState(null);

  if (categories === null) return <h2>Loading...</h2>

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="category table">
          <TableBody>
            {categories.map((cat) => (
              <CategoryItem
                key={cat.id}
                category={cat}
                selected={selectedCategory === cat.id}
                onSelect={onSelectCategory}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

export default CategorySelector
