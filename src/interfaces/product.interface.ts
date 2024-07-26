interface Image {
  thumbnail: string;
  mobile: string;
  desktop: string;
  tablet: string;
}

interface Product {
  name: string;
  category: string;
  price: number;
  image: Image;
  inCart: boolean;
  count: number;
}

export default Product;
