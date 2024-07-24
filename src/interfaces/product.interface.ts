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
}

export default Product;
