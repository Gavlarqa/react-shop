import {
  Breadcrumbs as MuiBreadcrumbs,
  Paper,
  Typography
} from '@mui/material'
import Link from 'next/link'
function Breadcrumbs ({ links, currentPage }) {
  return (
    <div style={{ paddingBottom: '5px' }}>
      <MuiBreadcrumbs aria-label='breadcrumb'>
        <Link href='/'>Home</Link>
        {links.map((l) => (
          <Link href={l.url}>{l.text}</Link>
        ))}
        <Typography color='text.primary'>{currentPage}</Typography>
      </MuiBreadcrumbs>
    </div>
  )
}

export default Breadcrumbs
