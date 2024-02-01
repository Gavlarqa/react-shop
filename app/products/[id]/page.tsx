'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { product } from '@/app/interfaces/products';
import { Grid, ImageList, ImageListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BasketSummary from './BasketSummary';

export default function ProductDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`)
      .then(async (r) => await r.json())
      .then((p) => {
        setProduct(p);
      });
  }, []);

  if (product === null) return <h2>Loading...</h2>;

  return (
    <React.Fragment>
      <Breadcrumbs
        links={[
          { url: '/products', text: 'All Products' },
          {
            url: `/products?categoryid=${product.category.id}`,
            text: product.category.name,
          },
        ]}
        currentPage={product.title}
      />

      <Grid container spacing={2}>
        <Grid item xs={10}>
          <h1>{product.title}</h1>
          <ImageList cols={3} rowHeight={164} sx={{ height: 400 }}>
            {product.images.map((img, i) => (
              <ImageListItem key={i}>
                <img
                  srcSet={`${img}?w=200&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${img}?w=164&h=164&fit=crop&auto=format`}
                  alt={product.title}
                  loading='lazy'
                />
              </ImageListItem>
            ))}
          </ImageList>
          <p>{product.description}</p>
        </Grid>
        <Grid item xs={2}>
          <BasketSummary product={product} />
          <p>£{product.price}</p>
          <p>{product.category.name}</p>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
