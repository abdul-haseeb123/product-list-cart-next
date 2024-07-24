import React from "react";
import { getProducts } from "@/api/getData";
import Product from "@/interfaces/product.interface";
import { ProductCard } from "@/components/Product";

export default async function page() {
  const products: Product[] = await getProducts();
  return (
    <main className="min-h-screen grid place-content-center">
      {products.map((product, idx) => {
        return <ProductCard product={product} key={product.name + idx} />;
      })}
    </main>
  );
}
