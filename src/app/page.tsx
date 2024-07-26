"use client";

import React from "react";
import Product from "@/interfaces/product.interface";
import { ProductCard } from "@/components/Product";
import { Cart } from "@/components/Cart";
import { useProducts } from "@/context/ProductContext";

export default function page() {
  const { products } = useProducts();
  console.log("products", products);
  return (
    <main className="min-h-screen grid place-content-center bg-rose-50 pt-16">
      <div className="flex flex-col lg:flex-row justify-center gap-4">
        <section className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl text-black p-4">Desserts</h1>
          <section className="grid lg:grid-cols-3 sm:grid-cols-2 gap-x-2 gap-y-7">
            {products.map((product, idx) => {
              return <ProductCard product={product} key={product.name + idx} />;
            })}
          </section>
        </section>
        <Cart />
      </div>
    </main>
  );
}
