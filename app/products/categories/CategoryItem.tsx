import { type productCategory } from '@/app/interfaces/products'
import { TableCell, TableRow } from '@mui/material'
import { type ReactElement } from 'react'
import React from 'react'

function CategoryItem ({
  category,
  selected,
  onSelect
}: CategoryItemProps): ReactElement {
  return (
    <TableRow
      sx={{
        backgroundColor: selected ? 'rgb(238, 245, 245)' : null,
        cursor: selected ? null : 'pointer'
      }}
      onClick={() => {
        onSelect(category.id)
      }}
    >
      <TableCell>{category.name}</TableCell>
    </TableRow>
  )
}

interface CategoryItemProps {
  category: productCategory
  selected: boolean
  onSelect: (id: number) => any
}

export default CategoryItem
