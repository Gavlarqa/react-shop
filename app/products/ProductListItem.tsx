'use client'
import { TableCell, TableRow } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function ProductListItem ({
  title,
  imageUrl,
  categoryName,
  price,
  id
}: {
  id: number
  title: string
  imageUrl: string
  categoryName: string
  price: number
}) {
  const router = useRouter()
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      onClick={() => { router.push(`/products/${id}`) }}
    >
      <TableCell>
        <img src={imageUrl} alt={title} height={150} />
      </TableCell>
      <TableCell>
        <h3>{title}</h3>
      </TableCell>
      <TableCell>{categoryName}</TableCell>
      <TableCell>£{price}</TableCell>
    </TableRow>
  )
}
