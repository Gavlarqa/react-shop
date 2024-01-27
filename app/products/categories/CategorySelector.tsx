import { Paper, Table, TableBody, TableContainer } from '@mui/material'
import React, { type ReactElement } from 'react'
import CategoryItem from './CategoryItem'
import { type productCategory } from '@/app/interfaces/products'

function CategorySelector ({
  selectedCategory,
  onSelectCategory,
  categories
}: CategorySelectorProps): ReactElement {
  if (categories === null) return <h2>Loading...</h2>

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label='category table'>
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

interface CategorySelectorProps {
  selectedCategory: number
  onSelectCategory: (id: number | null) => any
  categories: productCategory[]
}

export default CategorySelector
