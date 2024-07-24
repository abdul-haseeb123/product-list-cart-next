import ProductInterface from "../interfaces/product.interface";
import Image from "next/image";

export function ProductCard({ product }: { product: ProductInterface }) {
  return (
    <div className="flex flex-col min-w-[300px] gap-2">
      <div className="card-header">
        <picture className="rounded-lg">
          <source
            media="(max-width: 500px)"
            srcSet={product.image.mobile.slice(8)}
          />
          <source
            media="(max-width: 600px)"
            srcSet={product.image.tablet.slice(8)}
          />
          <img src={product.image.desktop.slice(8)} alt={product.name} />
        </picture>
        <button className="rounded-3xl px-4 py-2 flex justify-evenly">
          <span>
            <Image
              priority
              src={"/images/icon-add-to-cart.svg"}
              width={10}
              height={10}
              alt="Add to cart icon"
            />
          </span>
          <span>Add to Cart</span>
        </button>
      </div>
      <div className="card-body flex flex-col">
        <p>{product.category}</p>
        <h2>{product.name}</h2>
        <p>{product.price}</p>
      </div>
    </div>
  );
}
