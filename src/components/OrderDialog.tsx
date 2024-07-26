"use client";
import { useSearchParams } from "next/navigation";
import React, { useRef, useEffect } from "react";
import { useProducts } from "@/context/ProductContext";
import OrderConfirmIcon from "../../public/images/icon-order-confirmed.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Dialog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, resetProducts } = useProducts();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const productsInCart = products.filter((product) => product.count > 0);

  const totalOrderValue = productsInCart.reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );
  const showDialog = searchParams.get("showOrder");

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  if (productsInCart.length == 0) {
    return null;
  }

  const closeDialog = () => {
    resetProducts();
    router.push("/");
    dialogRef.current?.close();
  };

  const dialog: JSX.Element | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="fixed top-50 left-50  sm:w-fit sm:h-fit  -translate-x-50 -translate-y-50 rounded-xl backdrop:bg-rose-900/50 overflow-hidden"
      >
        <div className="sm:w-[500px]  p-4 bg-white flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Image src={OrderConfirmIcon} alt="order confirmed" />

            <h1 className="font-bold text-black text-3xl">Order Confirmed</h1>
            <p className="text-sm text-rose-900">
              We hope you enjoyed your food
            </p>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl overflow-y-auto max-h-80">
            {productsInCart.map((product) => (
              <div
                className="flex py-2 border-b border-rose-100 gap-4 items-center"
                key={product.name}
              >
                <span>
                  <Image
                    src={
                      "/product-list-cart-next" +
                      product.image.thumbnail.slice(8)
                    }
                    alt={product.name}
                    width={100}
                    height={96}
                    className="w-full size-12 object-cover"
                  />
                </span>
                <div className="flex flex-col justify-between gap-1">
                  <h3 className="text-rose-900 font-semibold">
                    {product.name}
                  </h3>
                  <div className="flex gap-4">
                    <span className="text-red">{product.count}x</span>
                    <span className="text-rose-500">@ ${product.price}</span>
                  </div>
                </div>
                <span className="text-rose-900 font-semibold ml-auto">
                  ${product.price * product.count}
                </span>
              </div>
            ))}
            <div className="flex p-2 pt-3 border-rose-100 items-center justify-between">
              <span className="text-sm">Order Total</span>
              <span className="text-black font-bold text-xl ml-auto">
                ${totalOrderValue.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={closeDialog}
            className="bg-red text-center text-rose-50 p-4 rounded-full"
          >
            Start New Order
          </button>
        </div>
      </dialog>
    ) : null;
  return dialog;
}
