import Product from "../interfaces/product.interface";
import data from "./data.json";

const getProducts = async (): Promise<Product[]> => {
  return data as Product[];
};

export { getProducts };
