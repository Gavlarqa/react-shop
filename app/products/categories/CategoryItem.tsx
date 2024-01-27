import { Checkbox, TableCell, TableRow } from '@mui/material'

function CategoryItem ({ category, selected, onSelect }) {
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

export default CategoryItem
