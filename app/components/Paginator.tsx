import { Box, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import { ReactElement, useState } from 'react';

function Paginator({
  currentPage,
  numberOfPages,
  onChange,
}: PaginatorProps): ReactElement {
  return (
    <Box display='flex' justifyContent='center'>
      <nav role='pagination' aria-label='Product Pagination'>
        <Button
          onClick={() => onChange(currentPage - 1)}
          size='medium'
          variant='contained'
          aria-disabled={currentPage === 0}
          disabled={currentPage === 0}
          aria-label={`Go to Page ${currentPage - 1}`}
        >
          Previous
        </Button>
        <Select
          value={`${currentPage}`}
          aria-label='current page'
          size='small'
          onChange={(e) => onChange(parseInt(e.target.value))}
        >
          {Array.from(Array(numberOfPages).keys()).map((x) => (
            <MenuItem key={x} value={x}>
              Page {x + 1}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant='contained'
          size='medium'
          disabled={currentPage === numberOfPages - 1}
          aria-disabled={currentPage === numberOfPages - 1}
          aria-label={`Go to Page ${currentPage + 1}`}
          onClick={() => onChange(currentPage + 1)}
        >
          Next
        </Button>
      </nav>
    </Box>
  );
}

interface PaginatorProps {
  currentPage: number;
  numberOfPages: number;
  onChange: (page: number) => any;
}

export default Paginator;
