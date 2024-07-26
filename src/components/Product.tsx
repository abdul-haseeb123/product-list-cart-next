"use client";

import ProductInterface from "../interfaces/product.interface";
import Image from "next/image";
import AddToCart from "../../public/images/icon-add-to-cart.svg";
import { cn } from "@/lib/utils";
import { useProducts } from "@/context/ProductContext";

export function ProductCard({ product }: { product: ProductInterface }) {
  const { incrementDecrementProduct } = useProducts();
  return (
    <div className="flex flex-col sm:w-60 w-80">
      <div className="card-header">
        <picture className="rounded-lg">
          <source
            media="(max-width: 500px)"
            srcSet={"/product-list-cart-next" + product.image.mobile.slice(8)}
          />
          <source
            media="(max-width: 600px)"
            srcSet={"/product-list-cart-next" + product.image.tablet.slice(8)}
          />
          <img
            src={"/product-list-cart-next" + product.image.desktop.slice(8)}
            alt={product.name}
            className={cn("rounded-xl", {
              "border-4 border-red": product.count > 0,
            })}
          />
        </picture>
        <button
          className={cn(
            "rounded-3xl px-4 py-2 flex justify-evenly gap-3 bg-white border border-rose-500 hover:ring-red group z-10 mx-auto -translate-y-4 text-rose-900 w-40",
            {
              hidden: product.count > 0,
            }
          )}
          onClick={() => incrementDecrementProduct(product.name, true)}
        >
          <span>
            <Image priority src={AddToCart} alt="Add to cart icon" />
          </span>
          <span className="font-semibold group-hover:text-red">
            Add to Cart
          </span>
        </button>
        <div
          className={cn(
            "rounded-3xl py-2 flex justify-evenly items-center gap-3 bg-red border border-rose-500 hover:ring-red group z-10 mx-auto -translate-y-4 text-white w-40",
            {
              hidden: product.count == 0,
            }
          )}
        >
          <button
            className="size-6 flex items-center justify-center rounded-full border border-white hover:bg-white group/button"
            onClick={() => incrementDecrementProduct(product.name, false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="2"
              fill="none"
              viewBox="0 0 10 2"
              className="fill-white group-hover/button:fill-red "
            >
              <path d="M0 .375h10v1.25H0V.375Z" />
            </svg>
          </button>
          <span className="text-sm">{product.count}</span>
          <button
            className="size-6 flex items-center justify-center rounded-full border border-white hover:bg-white group/button"
            onClick={() => incrementDecrementProduct(product.name, true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10"
              className="fill-white group-hover/button:fill-red"
            >
              <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="card-body flex flex-col px-2 -mt-3">
        <p className="text-sm text-rose-300">{product.category}</p>
        <h2 className="font-bold">{product.name}</h2>
        <p className="font-bold text-red">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
