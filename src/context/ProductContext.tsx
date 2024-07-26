"use client";

import Product from "@/interfaces/product.interface";
import React, { useState, useContext, useEffect, createContext } from "react";
import { getProducts } from "@/api/getData";

const ProductsContext = createContext<{
  products: Product[];
  incrementDecrementProduct: (productName: string, increment: boolean) => void;
  removeProductFromCart: (productName: string) => void;
  resetProducts: () => void;
}>({
  products: [],
  incrementDecrementProduct: () => {},
  removeProductFromCart: () => {},
  resetProducts: () => {},
});

const useProducts = () => useContext(ProductsContext);

const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const incrementDecrementProduct = (
    productName: string,
    increment: boolean
  ) => {
    const updatedProducts = products.map((product) => {
      if (product.name == productName) {
        return {
          ...product,
          count: increment ? product.count + 1 : product.count - 1,
        };
      } else {
        return { ...product };
      }
    });
    setProducts(updatedProducts);
  };

  const resetProducts = () => {
    const updatedProducts = products.map((product) => {
      return {
        ...product,
        count: 0,
      };
    });
    setProducts(updatedProducts);
  };

  const removeProductFromCart = (productName: string) => {
    const updatedProducts = products.map((product) => {
      if (product.name == productName) {
        return {
          ...product,
          count: 0,
        };
      } else {
        return {
          ...product,
        };
      }
    });
    setProducts(updatedProducts);
  };

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      const res = data.map((product) => {
        return { ...product, inCart: false, count: 0 };
      });
      setProducts(res);
    };
    loadProducts();
  }, []);
  return (
    <ProductsContext.Provider
      value={{
        products,
        incrementDecrementProduct,
        removeProductFromCart,
        resetProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { useProducts, ProductsProvider };
