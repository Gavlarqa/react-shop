import { Checkbox, TableCell, TableRow } from "@mui/material";

function CategoryItem({ category, selected, onSelect }) {
  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={selected} onChange={() => onSelect(category.id)} />
      </TableCell>
      <TableCell>
        <img src={category.image} height={50} />
      </TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>{category.description}</TableCell>
    </TableRow>
  );
}

export default CategoryItem;
