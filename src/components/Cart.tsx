"use client";
import { useProducts } from "@/context/ProductContext";
import { cn } from "@/lib/utils";
import RemoveFromCart from "../../public/images/icon-remove-item.svg";
import IconCarbonNeutral from "../../public/images/icon-carbon-neutral.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Cart() {
  const router = useRouter();
  const { products, removeProductFromCart } = useProducts();
  const productsInCart = products.filter((product) => product.count > 0);
  const orderTotal = productsInCart.reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );
  return (
    <div
      className={cn(
        "sm:min-w-[330px] bg-white min-h-[330px] h-fit  sm:mt-10 p-5 rounded-xl bg-no-repeat bg-center grid overflow-clip",
        {
          "bg-empty-cart": productsInCart.length == 0,
        }
      )}
    >
      <h1 className="text-2xl font-bold text-red mt-2">
        Your Cart ({productsInCart.length})
      </h1>
      {productsInCart.length == 0 ? (
        <p className="font-medium text-rose-300 translate-y-14 text-sm mx-auto">
          Your added items will appear here
        </p>
      ) : (
        <div className="flex flex-col">
          {productsInCart.map((product) => (
            <div
              className="w-full flex justify-between py-4 border-b border-b-rose-100"
              key={product.name}
            >
              <div className="flex flex-col">
                <span className="font-semibold">{product.name}</span>
                <div className="flex gap-4">
                  <span className="text-red">{product.count}x</span>
                  <p className="font-light text-rose-500">
                    @ ${product.price}{" "}
                    <span className="font-medium text-rose-400">
                      ${product.price * product.count}
                    </span>
                  </p>
                </div>
              </div>
              <button onClick={() => removeProductFromCart(product.name)}>
                <Image src={RemoveFromCart} alt="remove product from cart" />
              </button>
            </div>
          ))}
          <div className="w-full flex justify-between py-4">
            <h1 className="text-black font-light">Order Total</h1>
            <span className="font-bold text-xl text-black">
              ${orderTotal.toFixed(2)}
            </span>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl flex justify-center gap-2 items-center">
            <span>
              <Image src={IconCarbonNeutral} alt="carbon neutral icon" />
            </span>
            <p className="text-xs text-rose-900">
              This is a <span className="font-semibold">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>
          <button
            className="bg-red/90 hover:bg-red p-3 flex justify-center mt-5 text-rose-50 rounded-full"
            onClick={() => router.push("?showOrder=y")}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}
