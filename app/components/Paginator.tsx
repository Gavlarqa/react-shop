import { ReactElement, useState } from 'react';

function Paginator({
  currentPage,
  numberOfPages,
  onChange,
}: PaginatorProps): ReactElement {
  return (
    <div>
      <button
        type='button'
        aria-label={`Go to Page ${currentPage - 1}`}
        onClick={() => onChange(currentPage - 1)}
      >
        Previous
      </button>
      <select
        aria-label='current page'
        value={`${currentPage}`}
        onChange={(e) => onChange(parseInt(e.target.value))}
      >
        {Array.from(Array(numberOfPages).keys()).map((x) => (
          <option key={x} value={x}>
            Page {x + 1}
          </option>
        ))}
      </select>
      <button
        type='button'
        aria-label={`Go to Page ${currentPage + 1}`}
        onClick={() => onChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

interface PaginatorProps {
  currentPage: number;
  numberOfPages: number;
  onChange: (page: number) => any;
}

export default Paginator;
