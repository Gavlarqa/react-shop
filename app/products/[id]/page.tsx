"use client";

import Breadcrumbs from "@/app/components/Breadcrumbs";
import React from "react";
import { useEffect, useState } from "react";

export default function ProductDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`)
      .then((r) => r.json())
      .then((p) => setProduct(p));
  }, []);

  if (product === null) return <h2>Loading...</h2>;

  return (
    <React.Fragment>
      <Breadcrumbs
        links={[
          { url: "/products", text: "All Products" },
          {
            url: `/products?categoryid=${product.category.id}`,
            text: product.category.name,
          },
        ]}
        currentPage={product.title}
      />

      <h1>{product.title}</h1>
      {product.images.map((i) => (
        <img src={i} width={300} />
      ))}
      <p>{product.description}</p>
      <p>£{product.price}</p>
      <p>{product.category.name}</p>
      <hokodo-marketing data-element="square-small" />
    </React.Fragment>
  );
}
